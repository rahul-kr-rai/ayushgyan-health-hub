import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface PaymentOptions {
  amount: number;
  currency?: string;
  receipt?: string;
  notes?: Record<string, string>;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  appointmentId?: string;
  onSuccess?: (paymentId: string) => void;
  onFailure?: (error: string) => void;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const useRazorpay = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const initiatePayment = async (options: PaymentOptions) => {
    setIsLoading(true);

    try {
      // Load Razorpay script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error('Failed to load Razorpay SDK');
      }

      // Create order
      const { data: orderData, error: orderError } = await supabase.functions.invoke(
        'create-razorpay-order',
        {
          body: {
            amount: options.amount,
            currency: options.currency || 'INR',
            receipt: options.receipt || `receipt_${Date.now()}`,
            notes: options.notes || {},
          },
        }
      );

      if (orderError || !orderData) {
        throw new Error(orderError?.message || 'Failed to create order');
      }

      // Configure Razorpay options
      const razorpayOptions = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        order_id: orderData.orderId,
        name: 'AyushGyan',
        description: 'Doctor Consultation Fee',
        image: '/favicon.ico',
        prefill: {
          name: options.prefill?.name || '',
          email: options.prefill?.email || '',
          contact: options.prefill?.contact || '',
        },
        theme: {
          color: '#16a34a',
        },
        handler: async (response: any) => {
          try {
            // Verify payment
            const { data: verifyData, error: verifyError } = await supabase.functions.invoke(
              'verify-razorpay-payment',
              {
                body: {
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  appointment_id: options.appointmentId,
                },
              }
            );

            if (verifyError || !verifyData?.success) {
              throw new Error(verifyError?.message || 'Payment verification failed');
            }

            toast({
              title: 'भुगतान सफल / Payment Successful',
              description: 'आपका भुगतान सफलतापूर्वक हो गया है।',
            });

            options.onSuccess?.(response.razorpay_payment_id);
          } catch (error: any) {
            toast({
              title: 'Verification Failed',
              description: error.message,
              variant: 'destructive',
            });
            options.onFailure?.(error.message);
          }
        },
        modal: {
          ondismiss: () => {
            setIsLoading(false);
            options.onFailure?.('Payment cancelled by user');
          },
        },
      };

      const razorpay = new window.Razorpay(razorpayOptions);
      razorpay.open();

      razorpay.on('payment.failed', (response: any) => {
        toast({
          title: 'भुगतान असफल / Payment Failed',
          description: response.error.description,
          variant: 'destructive',
        });
        options.onFailure?.(response.error.description);
      });
    } catch (error: any) {
      console.error('Payment error:', error);
      toast({
        title: 'Payment Error',
        description: error.message,
        variant: 'destructive',
      });
      options.onFailure?.(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { initiatePayment, isLoading };
};
