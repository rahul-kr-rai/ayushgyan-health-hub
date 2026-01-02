import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Leaf, Sparkles } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden bg-pattern-leaves">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/50" />
      
      {/* Decorative Elements */}
      <div className="absolute top-32 left-10 w-20 h-20 rounded-full bg-primary/10 animate-float" />
      <div className="absolute bottom-32 right-10 w-32 h-32 rounded-full bg-ayush-gold/10 animate-float" style={{ animationDelay: "2s" }} />
      <div className="absolute top-1/2 right-1/4 w-16 h-16 rounded-full bg-ayush-sage/20 animate-float" style={{ animationDelay: "4s" }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">AI-Powered Ayurvedic Health Platform</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-foreground mb-6 animate-slide-up">
            Ancient Wisdom,{" "}
            <span className="text-gradient-emerald">Modern Health</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: "0.2s" }}>
            Experience personalized Ayurvedic care with our AI Vaidya. Get instant health guidance, 
            connect with certified practitioners, and shop authentic Ayurvedic products.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: "0.4s" }}>
            <Button size="lg" className="text-lg px-8 py-6" asChild>
              <Link to="/chat">
                <Leaf className="w-5 h-5 mr-2" />
                Talk to AI Vaidya
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6" asChild>
              <Link to="/products">
                Explore Products
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 flex flex-wrap justify-center gap-8 animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <div className="text-center">
              <p className="text-3xl font-serif font-bold text-primary">10K+</p>
              <p className="text-sm text-muted-foreground">Active Users</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-serif font-bold text-primary">500+</p>
              <p className="text-sm text-muted-foreground">Verified Doctors</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-serif font-bold text-primary">1000+</p>
              <p className="text-sm text-muted-foreground">Products</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-serif font-bold text-primary">4.9★</p>
              <p className="text-sm text-muted-foreground">User Rating</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
