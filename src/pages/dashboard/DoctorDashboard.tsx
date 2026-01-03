import { useState } from "react";
import { Link } from "react-router-dom";
import DoctorLayout from "@/components/dashboard/DoctorLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Video,
  DollarSign,
  Users,
  Calendar,
  TrendingUp,
  MessageCircle,
  ArrowRight,
  Clock
} from "lucide-react";

const mockDoctorData = {
  name: "Dr. Arjun Sharma",
  specialization: "BAMS, MD (Ayurveda)",
  isOnline: true,
  patients: [
    { id: 1, name: "Priya Sharma", age: 32, condition: "Digestive Issues", severity: "moderate", lastVisit: "Dec 28, 2025" },
    { id: 2, name: "Rahul Verma", age: 45, condition: "Stress & Anxiety", severity: "mild", lastVisit: "Dec 26, 2025" },
    { id: 3, name: "Anita Gupta", age: 28, condition: "Skin Problems", severity: "severe", lastVisit: "Dec 25, 2025" },
    { id: 4, name: "Vikash Kumar", age: 55, condition: "Joint Pain", severity: "moderate", lastVisit: "Dec 24, 2025" },
    { id: 5, name: "Meera Patel", age: 38, condition: "Immunity Boost", severity: "mild", lastVisit: "Dec 22, 2025" },
  ],
  todaysAppointments: [
    { id: 1, patient: "Priya Sharma", time: "10:00 AM", type: "Follow-up", status: "upcoming" },
    { id: 2, patient: "New Patient", time: "11:30 AM", type: "Initial Consultation", status: "upcoming" },
    { id: 3, patient: "Rahul Verma", time: "2:00 PM", type: "Follow-up", status: "upcoming" },
    { id: 4, patient: "Anita Gupta", time: "4:00 PM", type: "Follow-up", status: "upcoming" },
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
    case "mild": return "bg-green-500/10 text-green-600 border-green-500/20";
    case "moderate": return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20";
    case "severe": return "bg-red-500/10 text-red-600 border-red-500/20";
    default: return "bg-muted text-muted-foreground";
  }
};

const DoctorDashboard = () => {
  const [isOnline, setIsOnline] = useState(mockDoctorData.isOnline);

  return (
    <DoctorLayout 
      doctorName={mockDoctorData.name}
      specialization={mockDoctorData.specialization}
      pageTitle="Dashboard"
      isOnline={isOnline}
      onOnlineChange={setIsOnline}
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
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
              <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
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
              <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
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
              <div className="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center">
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
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Recent Patients</CardTitle>
              <Button variant="ghost" size="sm" className="gap-1" asChild>
                <Link to="/dashboard/doctor/patients">
                  View All <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
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
                        <Badge variant="outline" className={getSeverityColor(patient.severity)}>
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

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
                  <Link to="/dashboard/doctor/prescriptions">
                    <span className="text-2xl">📝</span>
                    <span className="text-sm">Write Prescription</span>
                  </Link>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
                  <Link to="/products">
                    <span className="text-2xl">💊</span>
                    <span className="text-sm">Recommend Products</span>
                  </Link>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                  <span className="text-2xl">📊</span>
                  <span className="text-sm">View Reports</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Today's Appointments */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Today's Appointments
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockDoctorData.todaysAppointments.map((apt) => (
                <div 
                  key={apt.id}
                  className="flex items-center justify-between p-4 bg-secondary rounded-xl"
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

          {/* Status Card */}
          <Card className={isOnline ? "bg-green-500/5 border-green-500/20" : "bg-muted"}>
            <CardContent className="pt-6 text-center">
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${isOnline ? "bg-green-500/20" : "bg-muted"}`}>
                <span className="text-3xl">{isOnline ? "🟢" : "🔴"}</span>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-1">
                {isOnline ? "You're Online" : "You're Offline"}
              </h3>
              <p className="text-sm text-muted-foreground">
                {isOnline 
                  ? "Patients can book appointments with you"
                  : "Turn on to accept new appointments"
                }
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DoctorLayout>
  );
};

export default DoctorDashboard;
