import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Stethoscope } from "lucide-react";

const benefits = [
  "Reach patients across India",
  "Flexible scheduling",
  "Secure video consultations",
  "Easy prescription management",
  "Competitive earnings",
  "Professional dashboard",
];

const DoctorsSection = () => {
  return (
    <section id="doctors" className="py-24 bg-primary/5">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Stethoscope className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">For Practitioners</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
              Join Our Network of{" "}
              <span className="text-gradient-emerald">Ayurvedic Experts</span>
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8">
              Expand your practice with AyushGyan. Connect with patients seeking authentic 
              Ayurvedic care and grow your professional network.
            </p>

            {/* Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{benefit}</span>
                </div>
              ))}
            </div>

            <Button size="lg" asChild>
              <Link to="/login">
                Register as Doctor
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="bg-card rounded-2xl p-8 shadow-elevated border border-border">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-3xl">
                  👨‍⚕️
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Dr. Arjun Sharma</h4>
                  <p className="text-sm text-muted-foreground">BAMS, MD (Ayurveda)</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-secondary rounded-lg">
                  <span className="text-muted-foreground">Today's Consultations</span>
                  <span className="font-semibold text-foreground">12</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-secondary rounded-lg">
                  <span className="text-muted-foreground">Patient Rating</span>
                  <span className="font-semibold text-foreground">⭐ 4.9</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-secondary rounded-lg">
                  <span className="text-muted-foreground">Monthly Earnings</span>
                  <span className="font-semibold text-primary">₹85,000+</span>
                </div>
              </div>
            </div>
            
            {/* Decorative */}
            <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-ayush-gold/20 -z-10" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 rounded-full bg-primary/10 -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoctorsSection;
