import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

const questions = [
  {
    id: 1,
    category: "Body Frame",
    question: "What best describes your body frame?",
    options: [
      { text: "Thin, light frame with visible bones and veins", dosha: "vata" },
      { text: "Medium, athletic build with good muscle definition", dosha: "pitta" },
      { text: "Large, sturdy frame with tendency to gain weight", dosha: "kapha" },
    ],
  },
  {
    id: 2,
    category: "Skin Type",
    question: "How would you describe your skin?",
    options: [
      { text: "Dry, rough, thin, or cool to touch", dosha: "vata" },
      { text: "Warm, oily, prone to redness or acne", dosha: "pitta" },
      { text: "Thick, soft, smooth, and well-moisturized", dosha: "kapha" },
    ],
  },
  {
    id: 3,
    category: "Hair",
    question: "What best describes your hair?",
    options: [
      { text: "Dry, frizzy, thin, or brittle", dosha: "vata" },
      { text: "Fine, straight, prone to early graying or thinning", dosha: "pitta" },
      { text: "Thick, wavy, lustrous, and oily", dosha: "kapha" },
    ],
  },
  {
    id: 4,
    category: "Appetite",
    question: "How is your appetite?",
    options: [
      { text: "Variable - sometimes strong, sometimes weak", dosha: "vata" },
      { text: "Strong - I get irritable if I miss a meal", dosha: "pitta" },
      { text: "Steady but not intense - I can skip meals easily", dosha: "kapha" },
    ],
  },
  {
    id: 5,
    category: "Digestion",
    question: "How is your digestion?",
    options: [
      { text: "Irregular with gas and bloating", dosha: "vata" },
      { text: "Quick and strong, may have acid reflux", dosha: "pitta" },
      { text: "Slow and steady, heavy feeling after meals", dosha: "kapha" },
    ],
  },
  {
    id: 6,
    category: "Sleep",
    question: "How do you sleep?",
    options: [
      { text: "Light sleeper, often wake up during the night", dosha: "vata" },
      { text: "Moderate, wake up feeling alert", dosha: "pitta" },
      { text: "Deep and long, hard to wake up", dosha: "kapha" },
    ],
  },
  {
    id: 7,
    category: "Mind & Emotions",
    question: "How would you describe your mind?",
    options: [
      { text: "Quick, creative, but easily distracted or anxious", dosha: "vata" },
      { text: "Sharp, focused, but can be irritable or critical", dosha: "pitta" },
      { text: "Calm, steady, but can be slow or resistant to change", dosha: "kapha" },
    ],
  },
  {
    id: 8,
    category: "Stress Response",
    question: "How do you react to stress?",
    options: [
      { text: "Become anxious, worried, or fearful", dosha: "vata" },
      { text: "Become irritated, frustrated, or angry", dosha: "pitta" },
      { text: "Become withdrawn, stubborn, or emotionally eat", dosha: "kapha" },
    ],
  },
  {
    id: 9,
    category: "Weather Preference",
    question: "Which weather do you dislike most?",
    options: [
      { text: "Cold and dry weather", dosha: "vata" },
      { text: "Hot and humid weather", dosha: "pitta" },
      { text: "Cold and damp weather", dosha: "kapha" },
    ],
  },
  {
    id: 10,
    category: "Energy Levels",
    question: "How are your energy levels throughout the day?",
    options: [
      { text: "Variable - bursts of energy followed by fatigue", dosha: "vata" },
      { text: "Intense and sustained until I burn out", dosha: "pitta" },
      { text: "Steady and enduring but slow to start", dosha: "kapha" },
    ],
  },
];

type DoshaType = "vata" | "pitta" | "kapha";

const PrakritiQuiz = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, DoshaType>>({});
  const [showResults, setShowResults] = useState(false);

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = (dosha: DoshaType) => {
    setAnswers({ ...answers, [currentQuestion]: dosha });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateResults = () => {
    const counts = { vata: 0, pitta: 0, kapha: 0 };
    Object.values(answers).forEach((dosha) => {
      counts[dosha]++;
    });

    const total = Object.keys(answers).length || 1;
    return {
      vata: Math.round((counts.vata / total) * 100),
      pitta: Math.round((counts.pitta / total) * 100),
      kapha: Math.round((counts.kapha / total) * 100),
    };
  };

  const getPrimaryDosha = () => {
    const results = calculateResults();
    const sorted = Object.entries(results).sort((a, b) => b[1] - a[1]);
    
    if (sorted[0][1] - sorted[1][1] < 15) {
      return `${capitalize(sorted[0][0])}-${capitalize(sorted[1][0])}`;
    }
    return capitalize(sorted[0][0]);
  };

  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  if (showResults) {
    const results = calculateResults();
    const primaryDosha = getPrimaryDosha();

    return (
      <DashboardLayout 
        userName="Priya Sharma" 
        userPrakriti={primaryDosha}
        pageTitle="Your Prakriti Results"
      >
        <div className="max-w-3xl mx-auto">
          <Card className="overflow-hidden">
            <div className="bg-gradient-to-r from-primary/20 via-accent/20 to-ayush-gold/20 p-8 text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                <Check className="w-10 h-10 text-primary" />
              </div>
              <h2 className="text-3xl font-serif font-bold text-foreground mb-2">
                Your Prakriti: {primaryDosha}
              </h2>
              <p className="text-muted-foreground">
                Based on your responses, here's your dosha constitution
              </p>
            </div>

            <CardContent className="p-8">
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-6 rounded-xl bg-blue-500/10 border border-blue-500/20">
                  <div className="text-4xl font-serif font-bold text-blue-600 mb-2">
                    {results.vata}%
                  </div>
                  <div className="text-lg font-semibold text-foreground">Vata</div>
                  <p className="text-sm text-muted-foreground mt-1">Air & Space</p>
                </div>
                <div className="text-center p-6 rounded-xl bg-orange-500/10 border border-orange-500/20">
                  <div className="text-4xl font-serif font-bold text-orange-600 mb-2">
                    {results.pitta}%
                  </div>
                  <div className="text-lg font-semibold text-foreground">Pitta</div>
                  <p className="text-sm text-muted-foreground mt-1">Fire & Water</p>
                </div>
                <div className="text-center p-6 rounded-xl bg-green-500/10 border border-green-500/20">
                  <div className="text-4xl font-serif font-bold text-green-600 mb-2">
                    {results.kapha}%
                  </div>
                  <div className="text-lg font-semibold text-foreground">Kapha</div>
                  <p className="text-sm text-muted-foreground mt-1">Earth & Water</p>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <h3 className="text-lg font-semibold text-foreground">What this means for you</h3>
                <p className="text-muted-foreground">
                  Understanding your Prakriti helps personalize your Ayurvedic health journey. 
                  Your constitution influences your dietary needs, lifestyle choices, and the 
                  types of treatments that work best for you.
                </p>
              </div>

              <div className="flex gap-4">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setShowResults(false);
                    setCurrentQuestion(0);
                    setAnswers({});
                  }}
                >
                  Retake Quiz
                </Button>
                <Button onClick={() => navigate("/dashboard/patient")}>
                  Go to Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  const question = questions[currentQuestion];

  return (
    <DashboardLayout 
      userName="Priya Sharma" 
      pageTitle="Prakriti Analysis"
    >
      <div className="max-w-3xl mx-auto">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-sm font-medium text-primary">{question.category}</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <h2 className="text-2xl font-serif font-semibold text-foreground mb-8">
              {question.question}
            </h2>

            <div className="space-y-4">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option.dosha as DoshaType)}
                  className={cn(
                    "w-full p-4 rounded-xl border-2 text-left transition-all duration-200",
                    answers[currentQuestion] === option.dosha
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50 hover:bg-secondary"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0",
                      answers[currentQuestion] === option.dosha
                        ? "border-primary bg-primary"
                        : "border-muted-foreground"
                    )}>
                      {answers[currentQuestion] === option.dosha && (
                        <Check className="w-4 h-4 text-primary-foreground" />
                      )}
                    </div>
                    <span className="text-foreground">{option.text}</span>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrev}
            disabled={currentQuestion === 0}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={answers[currentQuestion] === undefined}
            className="gap-2"
          >
            {currentQuestion === questions.length - 1 ? "See Results" : "Next"}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PrakritiQuiz;
