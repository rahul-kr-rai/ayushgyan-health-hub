import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Star } from "lucide-react";

const featuredProducts = [
  {
    id: 1,
    name: "Ashwagandha Capsules",
    category: "Herbal Supplements",
    price: 599,
    rating: 4.8,
    image: "🌿",
    description: "Premium quality Ashwagandha for stress relief and vitality",
  },
  {
    id: 2,
    name: "Panchakarma Oil Set",
    category: "Oils & Body Care",
    price: 1299,
    rating: 4.9,
    image: "🧴",
    description: "Traditional massage oils for complete body detoxification",
  },
  {
    id: 3,
    name: "Copper Tongue Scraper",
    category: "Wellness Equipment",
    price: 249,
    rating: 4.7,
    image: "🪥",
    description: "Pure copper tongue cleaner for oral health and detox",
  },
  {
    id: 4,
    name: "Triphala Churna",
    category: "Herbal Supplements",
    price: 399,
    rating: 4.9,
    image: "🍃",
    description: "Classic Ayurvedic formula for digestive health",
  },
];

const ProductsPreview = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-2">
              Featured <span className="text-gradient-emerald">Products</span>
            </h2>
            <p className="text-muted-foreground">
              Authentic Ayurvedic products for your wellness journey
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/products">
              View All Products
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product, index) => (
            <Card 
              key={product.id}
              className="group border-border hover:border-primary/30 transition-all duration-300 hover:shadow-card overflow-hidden animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-0">
                {/* Product Image */}
                <div className="h-48 bg-secondary flex items-center justify-center text-6xl group-hover:scale-105 transition-transform">
                  {product.image}
                </div>
                
                {/* Product Info */}
                <div className="p-4">
                  <span className="text-xs text-primary font-medium uppercase tracking-wide">
                    {product.category}
                  </span>
                  <h3 className="text-lg font-semibold text-foreground mt-1 mb-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-foreground">
                      ₹{product.price}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-ayush-gold text-ayush-gold" />
                      <span className="text-sm text-muted-foreground">{product.rating}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsPreview;
