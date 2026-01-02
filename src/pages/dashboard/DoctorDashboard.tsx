import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Leaf, 
  Bell, 
  User, 
  LogOut, 
  Video,
  DollarSign,
  Users,
  Calendar,
  TrendingUp,
  MessageCircle
} from "lucide-react";

const mockDoctorData = {
  name: "Dr. Arjun Sharma",
  specialization: "BAMS, MD (Ayurveda)",
  isOnline: true,
  patients: [
    { id: 1, name: "Priya Sharma", age: 32, condition: "Digestive Issues", severity: "moderate" },
    { id: 2, name: "Rahul Verma", age: 45, condition: "Stress & Anxiety", severity: "mild" },
    { id: 3, name: "Anita Gupta", age: 28, condition: "Skin Problems", severity: "severe" },
    { id: 4, name: "Vikash Kumar", age: 55, condition: "Joint Pain", severity: "moderate" },
    { id: 5, name: "Meera Patel", age: 38, condition: "Immunity Boost", severity: "mild" },
  ],
  todaysAppointments: [
    { id: 1, patient: "Priya Sharma", time: "10:00 AM", type: "Follow-up" },
    { id: 2, patient: "New Patient", time: "11:30 AM", type: "Initial Consultation" },
    { id: 3, patient: "Rahul Verma", time: "2:00 PM", type: "Follow-up" },
    { id: 4, patient: "Anita Gupta", time: "4:00 PM", type: "Follow-up" },
  ],
  stats: {
    totalPatients: 156,
    thisWeek: 12,
    monthlyEarnings: 85000,
    rating: 4.9,
  },
};

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "mild": return "bg-green-100 text-green-800";
    case "moderate": return "bg-yellow-100 text-yellow-800";
    case "severe": return "bg-red-100 text-red-800";
    default: return "bg-muted text-muted-foreground";
  }
};

const DoctorDashboard = () => {
  const [isOnline, setIsOnline] = useState(mockDoctorData.isOnline);

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
              <Badge variant="secondary" className="ml-2">Doctor Portal</Badge>
            </Link>

            <div className="flex items-center gap-4">
              {/* Online Status Toggle */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground hidden sm:block">
                  {isOnline ? "Online" : "Offline"}
                </span>
                <Switch 
                  checked={isOnline} 
                  onCheckedChange={setIsOnline}
                  className={isOnline ? "data-[state=checked]:bg-green-500" : ""}
                />
              </div>

              <button className="relative p-2 text-muted-foreground hover:text-foreground">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
              </button>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="w-4 h-4 text-primary" />
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium">{mockDoctorData.name}</p>
                  <p className="text-xs text-muted-foreground">{mockDoctorData.specialization}</p>
                </div>
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
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-serif font-bold">{mockDoctorData.stats.totalPatients}</p>
                  <p className="text-sm text-muted-foreground">Total Patients</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-ayush-gold/10 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-serif font-bold">{mockDoctorData.stats.thisWeek}</p>
                  <p className="text-sm text-muted-foreground">This Week</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-serif font-bold">₹{(mockDoctorData.stats.monthlyEarnings / 1000).toFixed(0)}K</p>
                  <p className="text-sm text-muted-foreground">Monthly Earnings</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-serif font-bold">⭐ {mockDoctorData.stats.rating}</p>
                  <p className="text-sm text-muted-foreground">Patient Rating</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Patient List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Patient List</CardTitle>
                <Button variant="outline" size="sm">View All</Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Patient</TableHead>
                      <TableHead>Age</TableHead>
                      <TableHead>Condition</TableHead>
                      <TableHead>Severity</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockDoctorData.patients.map((patient) => (
                      <TableRow key={patient.id}>
                        <TableCell className="font-medium">{patient.name}</TableCell>
                        <TableCell>{patient.age}</TableCell>
                        <TableCell>{patient.condition}</TableCell>
                        <TableCell>
                          <Badge className={getSeverityColor(patient.severity)}>
                            {patient.severity}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            <MessageCircle className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* Today's Appointments */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Today's Appointments
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockDoctorData.todaysAppointments.map((apt) => (
                  <div 
                    key={apt.id}
                    className="flex items-center justify-between p-3 bg-secondary rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-foreground">{apt.patient}</p>
                      <p className="text-sm text-muted-foreground">{apt.time} • {apt.type}</p>
                    </div>
                    <Button size="sm" className="gap-1">
                      <Video className="w-4 h-4" />
                      Join
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/products">
                    <span className="mr-2">💊</span>
                    Recommend Products
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <span className="mr-2">📝</span>
                  Write Prescription
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <span className="mr-2">📊</span>
                  View Reports
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DoctorDashboard;
