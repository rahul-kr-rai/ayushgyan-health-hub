import { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Video, User, Star, IndianRupee, CreditCard } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useRazorpay } from "@/hooks/useRazorpay";
import { useLanguage } from "@/contexts/LanguageContext";

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  qualifications: string;
  experience_years: number;
  consultation_fee: number;
  bio: string;
  languages: string[];
  is_available: boolean;
}

interface Appointment {
  id: string;
  patient_name: string;
  patient_email: string;
  doctor_id: string;
  appointment_date: string;
  appointment_time: string;
  reason: string;
  status: string;
  notes: string;
  doctors?: Doctor;
}

const timeSlots = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM"
];

const Appointments = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Booking form state
  const [patientName, setPatientName] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState("");
  const [reason, setReason] = useState("");

  const { initiatePayment, isLoading: paymentLoading } = useRazorpay();
  const { t } = useLanguage();

  useEffect(() => {
    fetchDoctors();
    fetchAppointments();
  }, []);

  const fetchDoctors = async () => {
    const { data, error } = await supabase
      .from("doctors")
      .select("*")
      .eq("is_available", true);
    
    if (error) {
      toast({ title: "Error fetching doctors", description: error.message, variant: "destructive" });
    } else {
      setDoctors(data || []);
    }
  };

  const fetchAppointments = async () => {
    const { data, error } = await supabase
      .from("appointments")
      .select("*, doctors(*)")
      .order("appointment_date", { ascending: true });
    
    if (error) {
      toast({ title: "Error fetching appointments", description: error.message, variant: "destructive" });
    } else {
      setAppointments(data || []);
    }
  };

  const handlePayAndBook = async () => {
    if (!selectedDoctor || !patientName || !patientEmail || !selectedDate || !selectedTime) {
      toast({ title: "Missing fields", description: "Please fill in all required fields", variant: "destructive" });
      return;
    }

    setLoading(true);
    
    // First create appointment with pending status
    const { data: appointmentData, error: appointmentError } = await supabase
      .from("appointments")
      .insert({
        doctor_id: selectedDoctor.id,
        patient_name: patientName,
        patient_email: patientEmail,
        appointment_date: format(selectedDate, "yyyy-MM-dd"),
        appointment_time: selectedTime,
        reason: reason,
        status: "pending_payment"
      })
      .select()
      .single();

    if (appointmentError) {
      setLoading(false);
      toast({ title: "Booking failed", description: appointmentError.message, variant: "destructive" });
      return;
    }

    // Initiate payment
    initiatePayment({
      amount: selectedDoctor.consultation_fee,
      currency: 'INR',
      receipt: `appt_${appointmentData.id}`,
      notes: {
        doctor_name: selectedDoctor.name,
        patient_name: patientName,
        appointment_date: format(selectedDate, "yyyy-MM-dd"),
        appointment_time: selectedTime,
      },
      prefill: {
        name: patientName,
        email: patientEmail,
        contact: patientPhone,
      },
      appointmentId: appointmentData.id,
      onSuccess: () => {
        setBookingOpen(false);
        setPatientName("");
        setPatientEmail("");
        setPatientPhone("");
        setSelectedDate(undefined);
        setSelectedTime("");
        setReason("");
        setSelectedDoctor(null);
        setLoading(false);
        fetchAppointments();
      },
      onFailure: async (error) => {
        // Delete the pending appointment if payment failed
        await supabase.from("appointments").delete().eq("id", appointmentData.id);
        setLoading(false);
        toast({ 
          title: t('payment.failed'), 
          description: error,
          variant: "destructive" 
        });
      },
    });
  };

  const upcomingAppointments = appointments.filter(
    apt => apt.status !== "completed" && apt.status !== "cancelled" && apt.status !== "pending_payment"
  );
  const pastAppointments = appointments.filter(
    apt => apt.status === "completed"
  );

  return (
    <DashboardLayout 
      userName="Priya Sharma" 
      userPrakriti="Vata-Pitta"
      pageTitle={t('payment.bookAppointment')}
    >
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Available Doctors */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                Available Doctors / उपलब्ध डॉक्टर
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {doctors.map((doctor) => (
                <div 
                  key={doctor.id}
                  className="p-4 rounded-xl border border-border hover:border-primary/40 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <User className="w-8 h-8 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-foreground">{doctor.name}</h3>
                          <p className="text-sm text-primary">{doctor.specialty}</p>
                          <p className="text-xs text-muted-foreground">{doctor.qualifications}</p>
                        </div>
                        <Badge variant="secondary" className="hidden sm:flex">
                          <Star className="w-3 h-3 mr-1" />
                          {doctor.experience_years} yrs exp
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{doctor.bio}</p>
                      <div className="flex flex-wrap items-center gap-3 mt-3">
                        <span className="flex items-center text-sm font-medium text-foreground">
                          <IndianRupee className="w-4 h-4" />
                          {doctor.consultation_fee}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {doctor.languages?.join(", ")}
                        </span>
                      </div>
                      <Dialog open={bookingOpen && selectedDoctor?.id === doctor.id} onOpenChange={(open) => {
                        setBookingOpen(open);
                        if (open) setSelectedDoctor(doctor);
                      }}>
                        <DialogTrigger asChild>
                          <Button className="mt-3" size="sm">
                            {t('payment.bookAppointment')}
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                          <DialogHeader>
                            <DialogTitle>
                              {t('payment.bookAppointment')} - {doctor.name}
                            </DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="name">{t('appointment.yourName')} *</Label>
                                <Input 
                                  id="name" 
                                  value={patientName} 
                                  onChange={(e) => setPatientName(e.target.value)}
                                  placeholder="Enter your name / नाम दर्ज करें"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="email">{t('appointment.yourEmail')} *</Label>
                                <Input 
                                  id="email" 
                                  type="email"
                                  value={patientEmail} 
                                  onChange={(e) => setPatientEmail(e.target.value)}
                                  placeholder="your@email.com"
                                />
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="phone">Phone Number / फोन नंबर</Label>
                              <Input 
                                id="phone" 
                                type="tel"
                                value={patientPhone} 
                                onChange={(e) => setPatientPhone(e.target.value)}
                                placeholder="+91 9876543210"
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label>{t('appointment.selectDate')} *</Label>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    variant="outline"
                                    className={cn(
                                      "w-full justify-start text-left font-normal",
                                      !selectedDate && "text-muted-foreground"
                                    )}
                                  >
                                    <Calendar className="mr-2 h-4 w-4" />
                                    {selectedDate ? format(selectedDate, "PPP") : "Pick a date / तारीख चुनें"}
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                  <CalendarComponent
                                    mode="single"
                                    selected={selectedDate}
                                    onSelect={setSelectedDate}
                                    disabled={(date) => date < new Date()}
                                    initialFocus
                                    className="p-3 pointer-events-auto"
                                  />
                                </PopoverContent>
                              </Popover>
                            </div>

                            <div className="space-y-2">
                              <Label>{t('appointment.selectTime')} *</Label>
                              <Select value={selectedTime} onValueChange={setSelectedTime}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Choose a time slot / समय चुनें" />
                                </SelectTrigger>
                                <SelectContent>
                                  {timeSlots.map((slot) => (
                                    <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="reason">{t('appointment.reason')}</Label>
                              <Textarea 
                                id="reason"
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                                placeholder="Briefly describe your health concern... / अपनी स्वास्थ्य समस्या का वर्णन करें..."
                                rows={3}
                              />
                            </div>

                            <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="text-sm text-muted-foreground">{t('payment.consultationFee')}</p>
                                  <p className="text-xl font-bold text-foreground flex items-center">
                                    <IndianRupee className="w-5 h-5" />
                                    {doctor.consultation_fee}
                                  </p>
                                </div>
                                <CreditCard className="w-8 h-8 text-primary" />
                              </div>
                              <p className="text-xs text-muted-foreground mt-2">
                                UPI, Cards, Net Banking accepted / UPI, कार्ड, नेट बैंकिंग स्वीकृत
                              </p>
                            </div>

                            <Button 
                              onClick={handlePayAndBook} 
                              className="w-full gap-2"
                              disabled={loading || paymentLoading}
                            >
                              <IndianRupee className="w-4 h-4" />
                              {loading || paymentLoading 
                                ? t('payment.processing')
                                : `${t('payment.payAndBook')} ₹${doctor.consultation_fee}`
                              }
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Upcoming Appointments */}
          {upcomingAppointments.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Your Appointments / आपकी अपॉइंटमेंट्स
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingAppointments.map((apt) => (
                  <div 
                    key={apt.id}
                    className="p-4 rounded-xl border border-primary/20 bg-primary/5"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{apt.doctors?.name}</h3>
                          <p className="text-sm text-muted-foreground">{apt.doctors?.specialty}</p>
                          <div className="flex items-center gap-4 mt-2 text-sm">
                            <span className="flex items-center gap-1 text-muted-foreground">
                              <Calendar className="w-4 h-4" />
                              {format(new Date(apt.appointment_date), "MMM d, yyyy")}
                            </span>
                            <span className="flex items-center gap-1 text-muted-foreground">
                              <Clock className="w-4 h-4" />
                              {apt.appointment_time}
                            </span>
                            <Badge variant={apt.status === "confirmed" ? "default" : "secondary"}>
                              {apt.status === "confirmed" ? "कन्फर्म" : apt.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Reschedule</Button>
                        <Button size="sm" className="gap-2">
                          <Video className="w-4 h-4" />
                          Join Call
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Past Appointments */}
          {pastAppointments.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Past Appointments / पिछली अपॉइंटमेंट्स</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {pastAppointments.map((apt) => (
                  <div 
                    key={apt.id}
                    className="p-4 rounded-xl bg-secondary"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                          <User className="w-6 h-6 text-muted-foreground" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{apt.doctors?.name}</h3>
                          <p className="text-sm text-muted-foreground">{apt.doctors?.specialty}</p>
                          <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                            <span>{format(new Date(apt.appointment_date), "MMM d, yyyy")}</span>
                            <span>{apt.appointment_time}</span>
                          </div>
                          {apt.notes && (
                            <p className="mt-2 text-sm text-muted-foreground bg-background/50 p-2 rounded">
                              📝 {apt.notes}
                            </p>
                          )}
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">View Details</Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-6 text-center">
              <div className="text-4xl mb-3">🩺</div>
              <h4 className="font-semibold text-foreground mb-2">
                Need Instant Help? / तुरंत मदद चाहिए?
              </h4>
              <p className="text-sm text-muted-foreground mb-4">
                Chat with our AI Vaidya for quick Ayurvedic guidance anytime.
                <br />
                <span className="text-xs">त्वरित आयुर्वेदिक मार्गदर्शन के लिए AI वैद्य से चैट करें</span>
              </p>
              <Button variant="outline" className="w-full" onClick={() => window.location.href = "/chat"}>
                Start AI Chat / AI चैट शुरू करें
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Appointment Stats / आंकड़े</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Upcoming / आगामी</span>
                <span className="font-bold text-primary">{upcomingAppointments.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Completed / पूर्ण</span>
                <span className="font-bold text-green-600">{pastAppointments.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Available Doctors</span>
                <span className="font-bold text-foreground">{doctors.length}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Appointments;
