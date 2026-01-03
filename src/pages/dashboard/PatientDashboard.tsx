import { Link } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  MessageCircle, 
  ShoppingBag, 
  Calendar, 
  TrendingUp, 
  Clock,
  ArrowRight,
  Sparkles
} from "lucide-react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";

const mockPatientData = {
  name: "Priya Sharma",
  email: "priya@example.com",
  prakriti: "Vata-Pitta",
  doshaScores: {
    vata: 45,
    pitta: 35,
    kapha: 20,
  },
  recentConsultations: [
    { id: 1, doctor: "Dr. Arjun Sharma", date: "Dec 28, 2025", type: "Digestive Health" },
    { id: 2, doctor: "Dr. Meera Patel", date: "Dec 15, 2025", type: "Stress Management" },
  ],
  upcomingAppointment: {
    doctor: "Dr. Vikram Singh",
    date: "Jan 5, 2026",
    time: "10:00 AM",
  },
  recentOrders: [
    { id: 1, product: "Ashwagandha Capsules", status: "Delivered", date: "Dec 25, 2025" },
    { id: 2, product: "Triphala Churna", status: "In Transit", date: "Dec 30, 2025" },
  ],
  ritualsCompleted: 5,
  ritualsTotal: 8,
  streak: 5,
};

const doshaChartData = [
  { attribute: "Energy", vata: 80, pitta: 60, kapha: 40 },
  { attribute: "Digestion", vata: 50, pitta: 85, kapha: 70 },
  { attribute: "Sleep", vata: 40, pitta: 65, kapha: 90 },
  { attribute: "Mind", vata: 75, pitta: 70, kapha: 55 },
  { attribute: "Immunity", vata: 55, pitta: 60, kapha: 80 },
];

const PatientDashboard = () => {
  const ritualsProgress = Math.round(
    (mockPatientData.ritualsCompleted / mockPatientData.ritualsTotal) * 100
  );

  return (
    <DashboardLayout 
      userName={mockPatientData.name} 
      userPrakriti={mockPatientData.prakriti}
      pageTitle="Dashboard"
    >
      {/* Welcome Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-serif font-bold text-foreground mb-2">
          Namaste, {mockPatientData.name.split(" ")[0]}! 🙏
        </h2>
        <p className="text-muted-foreground">
          Continue your Ayurvedic wellness journey. Today's ritual progress: {ritualsProgress}%
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-serif font-bold text-foreground">{mockPatientData.streak}</p>
                <p className="text-sm text-muted-foreground">Day Streak</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-serif font-bold text-foreground">23</p>
                <p className="text-sm text-muted-foreground">AI Chats</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-serif font-bold text-foreground">8</p>
                <p className="text-sm text-muted-foreground">Consultations</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-ayush-gold/20 flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-ayush-gold" />
              </div>
              <div>
                <p className="text-2xl font-serif font-bold text-foreground">12</p>
                <p className="text-sm text-muted-foreground">Products</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Button asChild className="h-auto py-4 flex-col gap-2">
                  <Link to="/chat">
                    <MessageCircle className="w-6 h-6" />
                    <span>Chat with AI Vaidya</span>
                  </Link>
                </Button>
                <Button variant="outline" asChild className="h-auto py-4 flex-col gap-2">
                  <Link to="/dashboard/patient/prakriti">
                    <TrendingUp className="w-6 h-6" />
                    <span>Take Prakriti Quiz</span>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Appointment */}
          {mockPatientData.upcomingAppointment && (
            <Card className="border-primary/30 bg-primary/5">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Upcoming Appointment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold text-foreground">
                      {mockPatientData.upcomingAppointment.doctor}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {mockPatientData.upcomingAppointment.date} at {mockPatientData.upcomingAppointment.time}
                    </p>
                  </div>
                  <Button size="sm">Join Video Call</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recent Consultations */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Recent Consultations</CardTitle>
              <Button variant="ghost" size="sm" className="gap-1">
                View All <ArrowRight className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockPatientData.recentConsultations.map((consultation) => (
                  <div 
                    key={consultation.id}
                    className="flex items-center justify-between p-4 bg-secondary rounded-xl"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-lg">
                        👨‍⚕️
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{consultation.doctor}</p>
                        <p className="text-sm text-muted-foreground">{consultation.type}</p>
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">{consultation.date}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Orders */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Recent Orders</CardTitle>
              <Button variant="ghost" size="sm" asChild className="gap-1">
                <Link to="/products">View All <ArrowRight className="w-4 h-4" /></Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockPatientData.recentOrders.map((order) => (
                  <div 
                    key={order.id}
                    className="flex items-center justify-between p-4 bg-secondary rounded-xl"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-ayush-gold/10 flex items-center justify-center text-lg">
                        📦
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{order.product}</p>
                        <p className="text-sm text-muted-foreground">{order.date}</p>
                      </div>
                    </div>
                    <span className={`text-sm px-3 py-1 rounded-full ${
                      order.status === "Delivered" 
                        ? "bg-primary/10 text-primary" 
                        : "bg-ayush-gold/10 text-accent"
                    }`}>
                      {order.status}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Dosha Balance Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Dosha Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={doshaChartData}>
                    <PolarGrid stroke="hsl(var(--border))" />
                    <PolarAngleAxis 
                      dataKey="attribute" 
                      tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                    />
                    <PolarRadiusAxis 
                      angle={30} 
                      domain={[0, 100]} 
                      tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
                    />
                    <Radar
                      name="Vata"
                      dataKey="vata"
                      stroke="hsl(210, 100%, 50%)"
                      fill="hsl(210, 100%, 50%)"
                      fillOpacity={0.2}
                    />
                    <Radar
                      name="Pitta"
                      dataKey="pitta"
                      stroke="hsl(25, 95%, 53%)"
                      fill="hsl(25, 95%, 53%)"
                      fillOpacity={0.2}
                    />
                    <Radar
                      name="Kapha"
                      dataKey="kapha"
                      stroke="hsl(142, 76%, 36%)"
                      fill="hsl(142, 76%, 36%)"
                      fillOpacity={0.2}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500" />
                  <span className="text-sm text-muted-foreground">Vata</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-orange-500" />
                  <span className="text-sm text-muted-foreground">Pitta</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-600" />
                  <span className="text-sm text-muted-foreground">Kapha</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Daily Rituals Progress */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg">Today's Rituals</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/dashboard/patient/rituals">View All</Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">
                    {mockPatientData.ritualsCompleted} of {mockPatientData.ritualsTotal} completed
                  </span>
                  <span className="text-sm font-medium text-primary">{ritualsProgress}%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary to-accent transition-all"
                    style={{ width: `${ritualsProgress}%` }}
                  />
                </div>
              </div>
              <Button variant="outline" className="w-full" asChild>
                <Link to="/dashboard/patient/rituals">
                  Continue Rituals
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Daily Tip */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <div className="text-center">
                <span className="text-4xl mb-3 block">🌿</span>
                <h4 className="font-semibold text-foreground mb-2">Daily Wellness Tip</h4>
                <p className="text-sm text-muted-foreground">
                  As a Vata-Pitta type, start your morning with warm water and honey to 
                  balance your doshas and improve digestion.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PatientDashboard;
