import { MessageCircle, Video, Heart, ShoppingBag, Calendar, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: MessageCircle,
    title: "AI Vaidya Chat",
    description: "Get instant Ayurvedic health guidance from our AI assistant trained on ancient texts and modern research.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Video,
    title: "Video Consultations",
    description: "Connect with certified Ayurvedic practitioners for personalized consultations from the comfort of home.",
    color: "bg-ayush-gold/20 text-accent",
  },
  {
    icon: Heart,
    title: "Health Tracking",
    description: "Monitor your Prakriti balance, track symptoms, and receive daily wellness recommendations.",
    color: "bg-destructive/10 text-destructive",
  },
  {
    icon: ShoppingBag,
    title: "Authentic Products",
    description: "Shop verified Ayurvedic medicines, oils, and wellness equipment from trusted manufacturers.",
    color: "bg-ayush-sage text-ayush-emerald-dark",
  },
  {
    icon: Calendar,
    title: "Appointment Booking",
    description: "Easy scheduling with top Ayurvedic doctors. Get reminders and manage your health journey.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Shield,
    title: "Verified Doctors",
    description: "All practitioners are verified with credentials checked. Your health is in safe hands.",
    color: "bg-ayush-brown-light/20 text-accent",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 bg-secondary/50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            Everything You Need for{" "}
            <span className="text-gradient-emerald">Holistic Health</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Comprehensive Ayurvedic care combining AI technology with traditional wisdom
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={feature.title}
              className="group border-border hover:border-primary/30 transition-all duration-300 hover:shadow-card bg-card animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
