import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  MessageCircle, 
  ShoppingBag, 
  Calendar, 
  TrendingUp, 
  Leaf, 
  Bell,
  User,
  LogOut,
  Heart,
  Clock
} from "lucide-react";

const mockPatientData = {
  name: "Priya Sharma",
  email: "priya@example.com",
  prakriti: "Vata-Pitta",
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
};

const PatientDashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <Leaf className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-serif font-semibold text-foreground">
                AyushGyan
              </span>
            </Link>

            <div className="flex items-center gap-4">
              <button className="relative p-2 text-muted-foreground hover:text-foreground">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
              </button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="w-4 h-4 text-primary" />
                </div>
                <span className="hidden md:block text-sm font-medium">{mockPatientData.name}</span>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/login">
                  <LogOut className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-foreground mb-2">
            Namaste, {mockPatientData.name.split(" ")[0]}! 🙏
          </h1>
          <p className="text-muted-foreground">
            Your Prakriti: <span className="text-primary font-medium">{mockPatientData.prakriti}</span> • 
            Continue your wellness journey
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Button asChild className="h-auto py-4 flex-col gap-2">
            <Link to="/chat">
              <MessageCircle className="w-6 h-6" />
              <span>AI Vaidya Chat</span>
            </Link>
          </Button>
          <Button variant="outline" asChild className="h-auto py-4 flex-col gap-2">
            <Link to="/products">
              <ShoppingBag className="w-6 h-6" />
              <span>Shop Products</span>
            </Link>
          </Button>
          <Button variant="outline" asChild className="h-auto py-4 flex-col gap-2">
            <Link to="#">
              <Calendar className="w-6 h-6" />
              <span>Book Appointment</span>
            </Link>
          </Button>
          <Button variant="outline" asChild className="h-auto py-4 flex-col gap-2">
            <Link to="#">
              <Heart className="w-6 h-6" />
              <span>Health Tracker</span>
            </Link>
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
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
              <CardHeader>
                <CardTitle className="text-lg">Recent Consultations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockPatientData.recentConsultations.map((consultation) => (
                    <div 
                      key={consultation.id}
                      className="flex items-center justify-between p-3 bg-secondary rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
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
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/products">View All</Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockPatientData.recentOrders.map((order) => (
                    <div 
                      key={order.id}
                      className="flex items-center justify-between p-3 bg-secondary rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-ayush-gold/10 flex items-center justify-center">
                          📦
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{order.product}</p>
                          <p className="text-sm text-muted-foreground">{order.date}</p>
                        </div>
                      </div>
                      <span className={`text-sm px-2 py-1 rounded-full ${
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
            {/* Health Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Health Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-secondary rounded-lg">
                  <p className="text-sm text-muted-foreground">Dosha Balance</p>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs w-12">Vata</span>
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 w-3/4" />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs w-12">Pitta</span>
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-orange-500 w-1/2" />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs w-12">Kapha</span>
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 w-1/4" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-secondary rounded-lg text-center">
                    <p className="text-2xl font-serif font-bold text-foreground">8</p>
                    <p className="text-xs text-muted-foreground">Consultations</p>
                  </div>
                  <div className="p-3 bg-secondary rounded-lg text-center">
                    <p className="text-2xl font-serif font-bold text-foreground">12</p>
                    <p className="text-xs text-muted-foreground">Products Ordered</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Daily Tip */}
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="pt-6">
                <div className="text-center">
                  <span className="text-4xl mb-3 block">🌿</span>
                  <h4 className="font-semibold text-foreground mb-2">Daily Wellness Tip</h4>
                  <p className="text-sm text-muted-foreground">
                    Start your morning with warm water and honey to balance your Vata dosha 
                    and improve digestion.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PatientDashboard;
