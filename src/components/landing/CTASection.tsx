import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Leaf, ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-24 bg-primary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-40 h-40 rounded-full border-2 border-primary-foreground" />
        <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full border-2 border-primary-foreground" />
        <div className="absolute top-1/2 left-1/3 w-20 h-20 rounded-full bg-primary-foreground/20" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-16 h-16 rounded-full bg-primary-foreground/20 flex items-center justify-center mx-auto mb-6">
            <Leaf className="w-8 h-8 text-primary-foreground" />
          </div>
          
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-primary-foreground mb-6">
            Start Your Ayurvedic Wellness Journey Today
          </h2>
          
          <p className="text-lg text-primary-foreground/80 mb-10">
            Join thousands who have discovered the power of Ayurveda. 
            Get personalized health guidance, expert consultations, and authentic products.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary" 
              className="text-lg px-8 py-6" 
              asChild
            >
              <Link to="/chat">
                <Leaf className="w-5 h-5 mr-2" />
                Start Free Consultation
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-6 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10" 
              asChild
            >
              <Link to="/products">
                Browse Products
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
