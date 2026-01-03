import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Leaf, ShoppingCart, AlertCircle, Sparkles } from 'lucide-react';

const symptomCategories = {
  digestive: {
    name: 'Digestive Issues',
    symptoms: [
      { id: 'bloating', label: 'Bloating & Gas', dosha: 'vata' },
      { id: 'acidity', label: 'Acidity & Heartburn', dosha: 'pitta' },
      { id: 'constipation', label: 'Constipation', dosha: 'vata' },
      { id: 'diarrhea', label: 'Loose Stools', dosha: 'pitta' },
      { id: 'slow_digestion', label: 'Slow Digestion', dosha: 'kapha' },
      { id: 'loss_appetite', label: 'Loss of Appetite', dosha: 'kapha' },
    ]
  },
  energy: {
    name: 'Energy & Sleep',
    symptoms: [
      { id: 'fatigue', label: 'Chronic Fatigue', dosha: 'kapha' },
      { id: 'insomnia', label: 'Insomnia', dosha: 'vata' },
      { id: 'restless_sleep', label: 'Restless Sleep', dosha: 'pitta' },
      { id: 'oversleeping', label: 'Excessive Sleepiness', dosha: 'kapha' },
      { id: 'anxiety', label: 'Anxiety & Nervousness', dosha: 'vata' },
      { id: 'irritability', label: 'Irritability & Anger', dosha: 'pitta' },
    ]
  },
  skin: {
    name: 'Skin & Hair',
    symptoms: [
      { id: 'dry_skin', label: 'Dry & Rough Skin', dosha: 'vata' },
      { id: 'acne', label: 'Acne & Inflammation', dosha: 'pitta' },
      { id: 'oily_skin', label: 'Oily & Congested Skin', dosha: 'kapha' },
      { id: 'hair_fall', label: 'Hair Fall', dosha: 'pitta' },
      { id: 'dry_hair', label: 'Dry & Brittle Hair', dosha: 'vata' },
      { id: 'dandruff', label: 'Dandruff', dosha: 'kapha' },
    ]
  },
  respiratory: {
    name: 'Respiratory',
    symptoms: [
      { id: 'dry_cough', label: 'Dry Cough', dosha: 'vata' },
      { id: 'congestion', label: 'Nasal Congestion', dosha: 'kapha' },
      { id: 'sore_throat', label: 'Sore Throat', dosha: 'pitta' },
      { id: 'allergies', label: 'Seasonal Allergies', dosha: 'kapha' },
      { id: 'breathlessness', label: 'Breathlessness', dosha: 'kapha' },
    ]
  },
  musculoskeletal: {
    name: 'Muscles & Joints',
    symptoms: [
      { id: 'joint_pain', label: 'Joint Pain & Stiffness', dosha: 'vata' },
      { id: 'inflammation', label: 'Joint Inflammation', dosha: 'pitta' },
      { id: 'muscle_cramps', label: 'Muscle Cramps', dosha: 'vata' },
      { id: 'weakness', label: 'Muscle Weakness', dosha: 'kapha' },
      { id: 'back_pain', label: 'Back Pain', dosha: 'vata' },
    ]
  }
};

const remedyDatabase: Record<string, {
  herbs: { name: string; benefits: string; dosage: string }[];
  lifestyle: string[];
  diet: string[];
  products: { name: string; price: string; image: string }[];
}> = {
  vata: {
    herbs: [
      { name: 'Ashwagandha', benefits: 'Reduces stress, improves sleep, strengthens muscles', dosage: '500mg twice daily' },
      { name: 'Brahmi', benefits: 'Calms the mind, improves memory, reduces anxiety', dosage: '250mg twice daily' },
      { name: 'Triphala', benefits: 'Aids digestion, gentle detox, improves elimination', dosage: '1 tsp before bed' },
    ],
    lifestyle: [
      'Follow a regular daily routine (Dinacharya)',
      'Practice gentle yoga and meditation',
      'Oil massage (Abhyanga) with warm sesame oil',
      'Avoid excessive travel and movement',
      'Stay warm and avoid cold, dry environments',
    ],
    diet: [
      'Eat warm, cooked, moist foods',
      'Include healthy fats like ghee and sesame oil',
      'Favor sweet, sour, and salty tastes',
      'Avoid raw, cold, and dry foods',
      'Drink warm water and herbal teas',
    ],
    products: [
      { name: 'Ashwagandha Capsules', price: '₹349', image: '🌿' },
      { name: 'Brahmi Oil', price: '₹299', image: '🧴' },
      { name: 'Triphala Churna', price: '₹199', image: '🍃' },
      { name: 'Vata Balance Tea', price: '₹249', image: '🍵' },
    ]
  },
  pitta: {
    herbs: [
      { name: 'Shatavari', benefits: 'Cooling, nourishing, balances hormones', dosage: '500mg twice daily' },
      { name: 'Amalaki (Amla)', benefits: 'Rich in Vitamin C, cooling, rejuvenating', dosage: '1 tsp powder daily' },
      { name: 'Neem', benefits: 'Purifies blood, clears skin, cooling', dosage: '250mg twice daily' },
    ],
    lifestyle: [
      'Avoid excessive heat and sun exposure',
      'Practice cooling pranayama (Sheetali, Sheetkari)',
      'Moonlight walks and swimming',
      'Avoid competitive and aggressive activities',
      'Practice meditation for emotional balance',
    ],
    diet: [
      'Eat cooling, sweet, and bitter foods',
      'Include coconut, cucumber, and leafy greens',
      'Avoid spicy, sour, and fermented foods',
      'Drink coconut water and cooling herbal teas',
      'Favor sweet fruits like melons and grapes',
    ],
    products: [
      { name: 'Shatavari Capsules', price: '₹399', image: '🌿' },
      { name: 'Amla Juice', price: '₹249', image: '🧃' },
      { name: 'Neem Tablets', price: '₹179', image: '🍃' },
      { name: 'Pitta Cooling Oil', price: '₹329', image: '🧴' },
    ]
  },
  kapha: {
    herbs: [
      { name: 'Trikatu', benefits: 'Stimulates digestion, reduces congestion, boosts metabolism', dosage: '250mg before meals' },
      { name: 'Guggulu', benefits: 'Supports weight management, clears channels', dosage: '500mg twice daily' },
      { name: 'Tulsi', benefits: 'Clears respiratory system, boosts immunity', dosage: '2-3 cups tea daily' },
    ],
    lifestyle: [
      'Wake up early (before 6 AM)',
      'Practice vigorous exercise daily',
      'Dry brushing and invigorating massage',
      'Avoid daytime sleeping',
      'Stay active and avoid sedentary lifestyle',
    ],
    diet: [
      'Eat light, warm, and spicy foods',
      'Include ginger, pepper, and warming spices',
      'Avoid heavy, oily, and sweet foods',
      'Reduce dairy and wheat intake',
      'Drink warm water with honey and lemon',
    ],
    products: [
      { name: 'Trikatu Capsules', price: '₹279', image: '🌶️' },
      { name: 'Guggulu Tablets', price: '₹349', image: '🍃' },
      { name: 'Tulsi Tea', price: '₹199', image: '🍵' },
      { name: 'Kapha Detox Kit', price: '₹599', image: '📦' },
    ]
  }
};

const SymptomsChecker = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [dominantDosha, setDominantDosha] = useState<string | null>(null);

  const toggleSymptom = (symptomId: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptomId) 
        ? prev.filter(s => s !== symptomId)
        : [...prev, symptomId]
    );
    setShowResults(false);
  };

  const analyzeSymptoms = () => {
    const doshaCount = { vata: 0, pitta: 0, kapha: 0 };
    
    Object.values(symptomCategories).forEach(category => {
      category.symptoms.forEach(symptom => {
        if (selectedSymptoms.includes(symptom.id)) {
          doshaCount[symptom.dosha as keyof typeof doshaCount]++;
        }
      });
    });

    const dominant = Object.entries(doshaCount).reduce((a, b) => a[1] > b[1] ? a : b)[0];
    setDominantDosha(dominant);
    setShowResults(true);
  };

  const getDoshaColor = (dosha: string) => {
    switch (dosha) {
      case 'vata': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'pitta': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'kapha': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const remedies = dominantDosha ? remedyDatabase[dominantDosha] : null;

  return (
    <DashboardLayout userName="Patient">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Symptoms Checker</h1>
          <p className="text-muted-foreground mt-1">
            Select your symptoms to receive personalized Ayurvedic remedy suggestions
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Symptoms Selection */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Select Your Symptoms
                </CardTitle>
                <CardDescription>
                  Choose all symptoms you're currently experiencing
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px] pr-4">
                  <div className="space-y-6">
                    {Object.entries(symptomCategories).map(([key, category]) => (
                      <div key={key}>
                        <h3 className="font-semibold text-lg mb-3">{category.name}</h3>
                        <div className="grid sm:grid-cols-2 gap-3">
                          {category.symptoms.map(symptom => (
                            <div
                              key={symptom.id}
                              className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                                selectedSymptoms.includes(symptom.id)
                                  ? 'bg-primary/10 border-primary'
                                  : 'hover:bg-muted'
                              }`}
                              onClick={() => toggleSymptom(symptom.id)}
                            >
                              <Checkbox
                                checked={selectedSymptoms.includes(symptom.id)}
                                onCheckedChange={() => toggleSymptom(symptom.id)}
                              />
                              <span className="flex-1">{symptom.label}</span>
                              <Badge variant="outline" className={getDoshaColor(symptom.dosha)}>
                                {symptom.dosha}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                <div className="mt-6 flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    {selectedSymptoms.length} symptom(s) selected
                  </p>
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSelectedSymptoms([]);
                        setShowResults(false);
                      }}
                      disabled={selectedSymptoms.length === 0}
                    >
                      Clear All
                    </Button>
                    <Button
                      onClick={analyzeSymptoms}
                      disabled={selectedSymptoms.length === 0}
                      className="gap-2"
                    >
                      <Sparkles className="h-4 w-4" />
                      Analyze Symptoms
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Info */}
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  Important Note
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p>
                  This tool provides general Ayurvedic guidance based on traditional principles. 
                  It is not a substitute for professional medical advice. Please consult a 
                  qualified Ayurvedic practitioner or healthcare provider for serious conditions.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Dosha Guide</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge className="bg-blue-100 text-blue-800">Vata</Badge>
                  <span className="text-sm text-muted-foreground">Air + Space</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-red-100 text-red-800">Pitta</Badge>
                  <span className="text-sm text-muted-foreground">Fire + Water</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-100 text-green-800">Kapha</Badge>
                  <span className="text-sm text-muted-foreground">Water + Earth</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Results Section */}
        {showResults && remedies && (
          <Card className="border-primary/50">
            <CardHeader className="bg-gradient-to-r from-primary/10 to-transparent">
              <CardTitle className="flex items-center gap-2">
                <Leaf className="h-5 w-5 text-primary" />
                Your Personalized Ayurvedic Recommendations
              </CardTitle>
              <CardDescription>
                Based on your symptoms, you may have a <strong className="capitalize">{dominantDosha}</strong> imbalance
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <Tabs defaultValue="herbs">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="herbs">Herbs</TabsTrigger>
                  <TabsTrigger value="lifestyle">Lifestyle</TabsTrigger>
                  <TabsTrigger value="diet">Diet</TabsTrigger>
                  <TabsTrigger value="products">Products</TabsTrigger>
                </TabsList>

                <TabsContent value="herbs" className="mt-6">
                  <div className="grid md:grid-cols-3 gap-4">
                    {remedies.herbs.map((herb, idx) => (
                      <Card key={idx}>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg flex items-center gap-2">
                            🌿 {herb.name}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground mb-2">{herb.benefits}</p>
                          <Badge variant="outline" className="text-xs">
                            Dosage: {herb.dosage}
                          </Badge>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="lifestyle" className="mt-6">
                  <ul className="space-y-3">
                    {remedies.lifestyle.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                        <span className="text-primary">🧘</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </TabsContent>

                <TabsContent value="diet" className="mt-6">
                  <ul className="space-y-3">
                    {remedies.diet.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                        <span className="text-primary">🍽️</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </TabsContent>

                <TabsContent value="products" className="mt-6">
                  <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {remedies.products.map((product, idx) => (
                      <Card key={idx} className="text-center">
                        <CardContent className="pt-6">
                          <div className="text-4xl mb-3">{product.image}</div>
                          <h4 className="font-semibold mb-1">{product.name}</h4>
                          <p className="text-primary font-bold mb-3">{product.price}</p>
                          <Button size="sm" className="w-full gap-2">
                            <ShoppingCart className="h-4 w-4" />
                            Add to Cart
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default SymptomsChecker;
