import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Video, User } from "lucide-react";

const appointments = [
  {
    id: 1,
    doctor: "Dr. Vikram Singh",
    specialty: "Ayurvedic General Physician",
    date: "Jan 5, 2026",
    time: "10:00 AM",
    type: "Video Call",
    status: "upcoming",
  },
  {
    id: 2,
    doctor: "Dr. Meera Patel",
    specialty: "Panchakarma Specialist",
    date: "Jan 12, 2026",
    time: "2:30 PM",
    type: "Video Call",
    status: "upcoming",
  },
];

const pastAppointments = [
  {
    id: 3,
    doctor: "Dr. Arjun Sharma",
    specialty: "Digestive Health",
    date: "Dec 28, 2025",
    time: "11:00 AM",
    type: "Video Call",
    notes: "Recommended Triphala and dietary changes",
  },
  {
    id: 4,
    doctor: "Dr. Meera Patel",
    specialty: "Stress Management",
    date: "Dec 15, 2025",
    time: "3:00 PM",
    type: "Video Call",
    notes: "Prescribed Ashwagandha, breathing exercises",
  },
];

const Appointments = () => {
  return (
    <DashboardLayout 
      userName="Priya Sharma" 
      userPrakriti="Vata-Pitta"
      pageTitle="Appointments"
    >
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Upcoming Appointments */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Upcoming Appointments
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {appointments.map((apt) => (
                <div 
                  key={apt.id}
                  className="p-4 rounded-xl border border-primary/20 bg-primary/5"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{apt.doctor}</h3>
                        <p className="text-sm text-muted-foreground">{apt.specialty}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm">
                          <span className="flex items-center gap-1 text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            {apt.date}
                          </span>
                          <span className="flex items-center gap-1 text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            {apt.time}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Reschedule</Button>
                      <Button size="sm" className="gap-2">
                        <Video className="w-4 h-4" />
                        Join Call
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Past Appointments */}
          <Card>
            <CardHeader>
              <CardTitle>Past Appointments</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {pastAppointments.map((apt) => (
                <div 
                  key={apt.id}
                  className="p-4 rounded-xl bg-secondary"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                        <User className="w-6 h-6 text-muted-foreground" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{apt.doctor}</h3>
                        <p className="text-sm text-muted-foreground">{apt.specialty}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <span>{apt.date}</span>
                          <span>{apt.time}</span>
                        </div>
                        {apt.notes && (
                          <p className="mt-2 text-sm text-muted-foreground bg-background/50 p-2 rounded">
                            📝 {apt.notes}
                          </p>
                        )}
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">View Details</Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Book New Appointment</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Connect with certified Ayurvedic practitioners for personalized consultations.
              </p>
              <Button className="w-full">Find a Doctor</Button>
            </CardContent>
          </Card>

          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-6 text-center">
              <div className="text-4xl mb-3">🩺</div>
              <h4 className="font-semibold text-foreground mb-2">Need Urgent Help?</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Chat with our AI Vaidya for instant Ayurvedic guidance.
              </p>
              <Button variant="outline" className="w-full">Start AI Chat</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Appointments;
