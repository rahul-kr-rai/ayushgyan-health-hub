import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'hi';

interface Translations {
  [key: string]: {
    en: string;
    hi: string;
  };
}

const translations: Translations = {
  // Navigation
  'nav.home': { en: 'Home', hi: 'होम' },
  'nav.consultation': { en: 'AI Consultation', hi: 'AI परामर्श' },
  'nav.products': { en: 'Products', hi: 'उत्पाद' },
  'nav.doctors': { en: 'Doctors', hi: 'डॉक्टर' },
  'nav.login': { en: 'Login', hi: 'लॉगिन' },
  'nav.getStarted': { en: 'Get Started', hi: 'शुरू करें' },
  
  // Hero Section
  'hero.title': { en: 'Your Journey to', hi: 'आयुर्वेद के साथ' },
  'hero.titleHighlight': { en: 'Holistic Wellness', hi: 'संपूर्ण स्वास्थ्य' },
  'hero.subtitle': { en: 'Discover personalized Ayurvedic solutions with AI-powered consultations and expert guidance from certified practitioners.', hi: 'AI-संचालित परामर्श और प्रमाणित चिकित्सकों के विशेषज्ञ मार्गदर्शन के साथ व्यक्तिगत आयुर्वेदिक समाधान खोजें।' },
  'hero.startConsultation': { en: 'Start Free Consultation', hi: 'मुफ्त परामर्श शुरू करें' },
  'hero.browseProducts': { en: 'Browse Products', hi: 'उत्पाद देखें' },
  
  // Features
  'features.title': { en: 'Why Choose AyushGyan?', hi: 'AyushGyan क्यों चुनें?' },
  'features.aiConsultation': { en: 'AI Consultation', hi: 'AI परामर्श' },
  'features.aiDesc': { en: 'Get instant Ayurvedic advice powered by advanced AI', hi: 'उन्नत AI द्वारा संचालित त्वरित आयुर्वेदिक सलाह प्राप्त करें' },
  'features.expertDoctors': { en: 'Expert Doctors', hi: 'विशेषज्ञ डॉक्टर' },
  'features.doctorsDesc': { en: 'Connect with certified Ayurvedic practitioners', hi: 'प्रमाणित आयुर्वेदिक चिकित्सकों से जुड़ें' },
  'features.herbalProducts': { en: 'Herbal Products', hi: 'हर्बल उत्पाद' },
  'features.productsDesc': { en: 'Shop authentic Ayurvedic products', hi: 'प्रामाणिक आयुर्वेदिक उत्पाद खरीदें' },
  
  // Doctors Section
  'doctors.badge': { en: 'For Practitioners', hi: 'चिकित्सकों के लिए' },
  'doctors.title': { en: 'Join Our Network of', hi: 'हमारे नेटवर्क से जुड़ें' },
  'doctors.titleHighlight': { en: 'Ayurvedic Experts', hi: 'आयुर्वेदिक विशेषज्ञ' },
  'doctors.subtitle': { en: 'Expand your practice with AyushGyan. Connect with patients seeking authentic Ayurvedic care.', hi: 'AyushGyan के साथ अपनी प्रैक्टिस बढ़ाएं। प्रामाणिक आयुर्वेदिक देखभाल चाहने वाले मरीजों से जुड़ें।' },
  'doctors.register': { en: 'Register as Doctor', hi: 'डॉक्टर के रूप में पंजीकरण करें' },
  'doctors.benefits.reach': { en: 'Reach patients across India', hi: 'पूरे भारत में मरीजों तक पहुंचें' },
  'doctors.benefits.flexible': { en: 'Flexible scheduling', hi: 'लचीला शेड्यूलिंग' },
  'doctors.benefits.video': { en: 'Secure video consultations', hi: 'सुरक्षित वीडियो परामर्श' },
  'doctors.benefits.prescription': { en: 'Easy prescription management', hi: 'आसान प्रिस्क्रिप्शन प्रबंधन' },
  'doctors.benefits.earnings': { en: 'Competitive earnings', hi: 'प्रतिस्पर्धी कमाई' },
  'doctors.benefits.dashboard': { en: 'Professional dashboard', hi: 'पेशेवर डैशबोर्ड' },
  
  // CTA Section
  'cta.title': { en: 'Start Your Ayurvedic Wellness Journey Today', hi: 'आज ही अपनी आयुर्वेदिक कल्याण यात्रा शुरू करें' },
  'cta.subtitle': { en: 'Join thousands of people discovering natural health solutions', hi: 'हजारों लोगों के साथ प्राकृतिक स्वास्थ्य समाधान खोजें' },
  'cta.startFree': { en: 'Start Free Consultation', hi: 'मुफ्त परामर्श शुरू करें' },
  'cta.browseProducts': { en: 'Browse Products', hi: 'उत्पाद देखें' },
  
  // Products
  'products.title': { en: 'Featured Products', hi: 'विशेष उत्पाद' },
  'products.viewAll': { en: 'View All Products', hi: 'सभी उत्पाद देखें' },
  'products.addToCart': { en: 'Add to Cart', hi: 'कार्ट में डालें' },
  
  // Payment
  'payment.payNow': { en: 'Pay Now', hi: 'अब भुगतान करें' },
  'payment.success': { en: 'Payment Successful', hi: 'भुगतान सफल रहा' },
  'payment.failed': { en: 'Payment Failed', hi: 'भुगतान असफल हुआ' },
  'payment.processing': { en: 'Processing Payment...', hi: 'भुगतान प्रोसेस हो रहा है...' },
  'payment.consultationFee': { en: 'Consultation Fee', hi: 'परामर्श शुल्क' },
  'payment.bookAppointment': { en: 'Book Appointment', hi: 'अपॉइंटमेंट बुक करें' },
  'payment.payAndBook': { en: 'Pay & Book', hi: 'भुगतान करें और बुक करें' },
  'payment.retry': { en: 'Retry Payment', hi: 'पुनः भुगतान करें' },
  
  // Appointments
  'appointment.selectDate': { en: 'Select Date', hi: 'तारीख चुनें' },
  'appointment.selectTime': { en: 'Select Time', hi: 'समय चुनें' },
  'appointment.yourName': { en: 'Your Name', hi: 'आपका नाम' },
  'appointment.yourEmail': { en: 'Your Email', hi: 'आपका ईमेल' },
  'appointment.reason': { en: 'Reason for Visit', hi: 'मिलने का कारण' },
  'appointment.confirmed': { en: 'Appointment Confirmed', hi: 'अपॉइंटमेंट कन्फर्म हो गया' },
  
  // Common
  'common.loading': { en: 'Loading...', hi: 'लोड हो रहा है...' },
  'common.error': { en: 'Something went wrong', hi: 'कुछ गलत हो गया' },
  'common.success': { en: 'Success', hi: 'सफल' },
  'common.cancel': { en: 'Cancel', hi: 'रद्द करें' },
  'common.submit': { en: 'Submit', hi: 'जमा करें' },
  'common.close': { en: 'Close', hi: 'बंद करें' },
  
  // Footer
  'footer.rights': { en: 'All rights reserved', hi: 'सर्वाधिकार सुरक्षित' },
  'footer.privacy': { en: 'Privacy Policy', hi: 'गोपनीयता नीति' },
  'footer.terms': { en: 'Terms of Service', hi: 'सेवा की शर्तें' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('ayushgyan-language');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('ayushgyan-language', language);
  }, [language]);

  const t = (key: string): string => {
    const translation = translations[key];
    if (!translation) {
      console.warn(`Translation missing for key: ${key}`);
      return key;
    }
    return translation[language];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
