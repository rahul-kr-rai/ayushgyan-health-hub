import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { 
  Sun, 
  Moon, 
  Droplets, 
  Wind, 
  Flame,
  Leaf,
  Trophy,
  Calendar
} from "lucide-react";

interface Ritual {
  id: string;
  name: string;
  description: string;
  time: "morning" | "evening";
  icon: React.ElementType;
  completed: boolean;
}

const initialRituals: Ritual[] = [
  {
    id: "1",
    name: "Brahma Muhurta Wake",
    description: "Wake up before sunrise (5:30 AM)",
    time: "morning",
    icon: Sun,
    completed: false,
  },
  {
    id: "2",
    name: "Tongue Scraping",
    description: "Clean toxins (ama) from tongue",
    time: "morning",
    icon: Droplets,
    completed: false,
  },
  {
    id: "3",
    name: "Oil Pulling",
    description: "Swish sesame oil for 10-15 minutes",
    time: "morning",
    icon: Flame,
    completed: false,
  },
  {
    id: "4",
    name: "Pranayama",
    description: "10 minutes of breathing exercises",
    time: "morning",
    icon: Wind,
    completed: false,
  },
  {
    id: "5",
    name: "Warm Water & Herbs",
    description: "Drink warm water with lemon or tulsi",
    time: "morning",
    icon: Leaf,
    completed: false,
  },
  {
    id: "6",
    name: "Abhyanga",
    description: "Self-massage with warm oil",
    time: "evening",
    icon: Droplets,
    completed: false,
  },
  {
    id: "7",
    name: "Light Dinner",
    description: "Eat before 7 PM, keep it light",
    time: "evening",
    icon: Moon,
    completed: false,
  },
  {
    id: "8",
    name: "Digital Detox",
    description: "No screens 1 hour before bed",
    time: "evening",
    icon: Moon,
    completed: false,
  },
];

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const DailyRituals = () => {
  const [rituals, setRituals] = useState<Ritual[]>(initialRituals);
  const [selectedDay, setSelectedDay] = useState(new Date().getDay());

  // Mock weekly data
  const weeklyProgress = [65, 80, 75, 90, 85, 50, 0];

  const toggleRitual = (id: string) => {
    setRituals(rituals.map(r => 
      r.id === id ? { ...r, completed: !r.completed } : r
    ));
  };

  const morningRituals = rituals.filter(r => r.time === "morning");
  const eveningRituals = rituals.filter(r => r.time === "evening");
  const completedCount = rituals.filter(r => r.completed).length;
  const progressPercent = Math.round((completedCount / rituals.length) * 100);

  return (
    <DashboardLayout 
      userName="Priya Sharma" 
      userPrakriti="Vata-Pitta"
      pageTitle="Daily Rituals (Dinacharya)"
    >
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Today's Progress */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Today's Progress</h3>
                  <p className="text-sm text-muted-foreground">
                    {completedCount} of {rituals.length} rituals completed
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className={cn(
                    "w-6 h-6",
                    progressPercent === 100 ? "text-ayush-gold" : "text-muted-foreground"
                  )} />
                  <span className="text-2xl font-serif font-bold text-primary">
                    {progressPercent}%
                  </span>
                </div>
              </div>
              <div className="h-3 bg-secondary rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </CardContent>
          </Card>

          {/* Morning Rituals */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sun className="w-5 h-5 text-ayush-gold" />
                Morning Rituals
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {morningRituals.map((ritual) => (
                <div
                  key={ritual.id}
                  className={cn(
                    "flex items-center gap-4 p-4 rounded-xl border transition-all duration-200",
                    ritual.completed
                      ? "bg-primary/5 border-primary/30"
                      : "bg-secondary/50 border-border hover:border-primary/30"
                  )}
                >
                  <Checkbox
                    checked={ritual.completed}
                    onCheckedChange={() => toggleRitual(ritual.id)}
                    className="h-6 w-6"
                  />
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center",
                    ritual.completed ? "bg-primary/20" : "bg-muted"
                  )}>
                    <ritual.icon className={cn(
                      "w-5 h-5",
                      ritual.completed ? "text-primary" : "text-muted-foreground"
                    )} />
                  </div>
                  <div className="flex-1">
                    <p className={cn(
                      "font-medium",
                      ritual.completed ? "text-primary line-through" : "text-foreground"
                    )}>
                      {ritual.name}
                    </p>
                    <p className="text-sm text-muted-foreground">{ritual.description}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Evening Rituals */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Moon className="w-5 h-5 text-accent" />
                Evening Rituals
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {eveningRituals.map((ritual) => (
                <div
                  key={ritual.id}
                  className={cn(
                    "flex items-center gap-4 p-4 rounded-xl border transition-all duration-200",
                    ritual.completed
                      ? "bg-primary/5 border-primary/30"
                      : "bg-secondary/50 border-border hover:border-primary/30"
                  )}
                >
                  <Checkbox
                    checked={ritual.completed}
                    onCheckedChange={() => toggleRitual(ritual.id)}
                    className="h-6 w-6"
                  />
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center",
                    ritual.completed ? "bg-accent/20" : "bg-muted"
                  )}>
                    <ritual.icon className={cn(
                      "w-5 h-5",
                      ritual.completed ? "text-accent" : "text-muted-foreground"
                    )} />
                  </div>
                  <div className="flex-1">
                    <p className={cn(
                      "font-medium",
                      ritual.completed ? "text-accent line-through" : "text-foreground"
                    )}>
                      {ritual.name}
                    </p>
                    <p className="text-sm text-muted-foreground">{ritual.description}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Weekly Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                This Week
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2">
                {weekDays.map((day, index) => (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(index)}
                    className={cn(
                      "flex flex-col items-center p-2 rounded-lg transition-all",
                      selectedDay === index
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-secondary"
                    )}
                  >
                    <span className="text-xs font-medium">{day}</span>
                    <span className={cn(
                      "text-lg font-bold",
                      selectedDay === index ? "" : "text-foreground"
                    )}>
                      {weeklyProgress[index]}%
                    </span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Streak Card */}
          <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
            <CardContent className="pt-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-ayush-gold/20 flex items-center justify-center">
                <Trophy className="w-8 h-8 text-ayush-gold" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-foreground mb-1">
                5 Day Streak! 🔥
              </h3>
              <p className="text-sm text-muted-foreground">
                Keep going to maintain your discipline
              </p>
            </CardContent>
          </Card>

          {/* Tips Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">💡 Today's Tip</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                For Vata-Pitta types, focus on grounding morning rituals. 
                Warm oil massage (Abhyanga) is especially beneficial for 
                calming your nervous system.
              </p>
              <Button variant="link" className="px-0 mt-2">
                Learn more →
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DailyRituals;
