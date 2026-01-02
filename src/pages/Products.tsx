import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Leaf, 
  Search, 
  Filter, 
  Star, 
  ShoppingCart,
  ArrowLeft,
  Plus,
  Minus
} from "lucide-react";

const categories = [
  { id: "all", name: "All Products" },
  { id: "supplements", name: "Herbal Supplements" },
  { id: "oils", name: "Oils & Body Care" },
  { id: "equipment", name: "Wellness Equipment" },
];

const products = [
  {
    id: 1,
    name: "Ashwagandha Capsules",
    category: "supplements",
    price: 599,
    originalPrice: 799,
    rating: 4.8,
    reviews: 234,
    image: "🌿",
    description: "Premium organic Ashwagandha for stress relief and vitality",
    benefits: ["Reduces stress", "Boosts energy", "Improves sleep"],
  },
  {
    id: 2,
    name: "Triphala Churna",
    category: "supplements",
    price: 399,
    rating: 4.9,
    reviews: 456,
    image: "🍃",
    description: "Classic Ayurvedic formula for digestive health",
    benefits: ["Digestive support", "Detoxification", "Immunity boost"],
  },
  {
    id: 3,
    name: "Chyawanprash",
    category: "supplements",
    price: 449,
    originalPrice: 549,
    rating: 4.7,
    reviews: 189,
    image: "🍯",
    description: "Traditional immunity booster with 40+ herbs",
    benefits: ["Immunity", "Rejuvenation", "Energy"],
  },
  {
    id: 4,
    name: "Panchakarma Massage Oil",
    category: "oils",
    price: 899,
    rating: 4.8,
    reviews: 167,
    image: "🧴",
    description: "Premium herbal oil blend for therapeutic massage",
    benefits: ["Deep relaxation", "Muscle relief", "Detox"],
  },
  {
    id: 5,
    name: "Brahmi Hair Oil",
    category: "oils",
    price: 349,
    rating: 4.6,
    reviews: 298,
    image: "💆",
    description: "Ayurvedic hair oil for healthy, strong hair",
    benefits: ["Hair growth", "Scalp health", "Prevents grey hair"],
  },
  {
    id: 6,
    name: "Kumkumadi Face Oil",
    category: "oils",
    price: 1299,
    originalPrice: 1599,
    rating: 4.9,
    reviews: 412,
    image: "✨",
    description: "Luxurious saffron-based oil for radiant skin",
    benefits: ["Skin brightening", "Anti-aging", "Glow"],
  },
  {
    id: 7,
    name: "Copper Tongue Scraper",
    category: "equipment",
    price: 249,
    rating: 4.7,
    reviews: 534,
    image: "🪥",
    description: "Pure copper tongue cleaner for oral hygiene",
    benefits: ["Oral detox", "Fresh breath", "Digestion"],
  },
  {
    id: 8,
    name: "Copper Water Bottle",
    category: "equipment",
    price: 799,
    rating: 4.8,
    reviews: 321,
    image: "🫗",
    description: "Handcrafted pure copper bottle for healthy water",
    benefits: ["Alkaline water", "Immunity", "Digestion"],
  },
  {
    id: 9,
    name: "Neti Pot (Ceramic)",
    category: "equipment",
    price: 449,
    rating: 4.5,
    reviews: 198,
    image: "🏺",
    description: "Traditional nasal cleansing pot for respiratory health",
    benefits: ["Sinus relief", "Better breathing", "Allergy relief"],
  },
  {
    id: 10,
    name: "Yoga Mat (Organic)",
    category: "equipment",
    price: 1499,
    originalPrice: 1999,
    rating: 4.9,
    reviews: 267,
    image: "🧘",
    description: "Eco-friendly yoga mat made from natural materials",
    benefits: ["Non-slip", "Eco-friendly", "Comfortable"],
  },
  {
    id: 11,
    name: "Brahmi Capsules",
    category: "supplements",
    price: 549,
    rating: 4.7,
    reviews: 178,
    image: "🧠",
    description: "Brain tonic for memory and cognitive function",
    benefits: ["Memory boost", "Focus", "Mental clarity"],
  },
  {
    id: 12,
    name: "Sesame Massage Oil",
    category: "oils",
    price: 399,
    rating: 4.6,
    reviews: 234,
    image: "🌰",
    description: "Warming sesame oil for Abhyanga self-massage",
    benefits: ["Nourishing", "Warming", "Joint health"],
  },
];

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<{ [key: number]: number }>({});

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (productId: number) => {
    setCart((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }));
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => {
      const newCart = { ...prev };
      if (newCart[productId] > 1) {
        newCart[productId]--;
      } else {
        delete newCart[productId];
      }
      return newCart;
    });
  };

  const cartTotal = Object.entries(cart).reduce((total, [productId, quantity]) => {
    const product = products.find((p) => p.id === Number(productId));
    return total + (product?.price || 0) * quantity;
  }, 0);

  const cartItemCount = Object.values(cart).reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Link>
              </Button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <Leaf className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="text-lg font-serif font-semibold text-foreground">
                  AyushGyan Shop
                </span>
              </div>
            </div>

            <Button variant="outline" className="relative">
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
              <span className="ml-2 hidden sm:inline">₹{cartTotal}</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-foreground mb-2">
            Ayurvedic <span className="text-gradient-emerald">Products</span>
          </h1>
          <p className="text-muted-foreground">
            Authentic Ayurvedic products for your wellness journey
          </p>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search products..." 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="whitespace-nowrap"
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card 
              key={product.id}
              className="group border-border hover:border-primary/30 transition-all duration-300 hover:shadow-card overflow-hidden"
            >
              <CardContent className="p-0">
                {/* Product Image */}
                <div className="relative h-48 bg-secondary flex items-center justify-center text-6xl group-hover:scale-105 transition-transform">
                  {product.image}
                  {product.originalPrice && (
                    <Badge className="absolute top-2 right-2 bg-destructive">
                      {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                    </Badge>
                  )}
                </div>
                
                {/* Product Info */}
                <div className="p-4">
                  <span className="text-xs text-primary font-medium uppercase tracking-wide">
                    {categories.find((c) => c.id === product.category)?.name}
                  </span>
                  <h3 className="text-lg font-semibold text-foreground mt-1 mb-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                    {product.description}
                  </p>

                  {/* Benefits */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {product.benefits.slice(0, 2).map((benefit) => (
                      <Badge key={benefit} variant="secondary" className="text-xs">
                        {benefit}
                      </Badge>
                    ))}
                  </div>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-3">
                    <Star className="w-4 h-4 fill-ayush-gold text-ayush-gold" />
                    <span className="text-sm font-medium">{product.rating}</span>
                    <span className="text-sm text-muted-foreground">({product.reviews})</span>
                  </div>

                  {/* Price & Add to Cart */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xl font-bold text-foreground">₹{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through ml-2">
                          ₹{product.originalPrice}
                        </span>
                      )}
                    </div>
                    
                    {cart[product.id] ? (
                      <div className="flex items-center gap-2">
                        <Button 
                          size="icon" 
                          variant="outline" 
                          className="h-8 w-8"
                          onClick={() => removeFromCart(product.id)}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="w-8 text-center font-medium">{cart[product.id]}</span>
                        <Button 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => addToCart(product.id)}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    ) : (
                      <Button size="sm" onClick={() => addToCart(product.id)}>
                        Add to Cart
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No products found matching your criteria.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Products;
