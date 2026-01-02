import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import ProductsPreview from "@/components/landing/ProductsPreview";
import DoctorsSection from "@/components/landing/DoctorsSection";
import CTASection from "@/components/landing/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <ProductsPreview />
        <DoctorsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
