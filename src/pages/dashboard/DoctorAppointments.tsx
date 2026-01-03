import { useState } from "react";
import DoctorLayout from "@/components/dashboard/DoctorLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Video, User, Check, X } from "lucide-react";

const upcomingAppointments = [
  { id: 1, patient: "Priya Sharma", date: "Jan 3, 2026", time: "10:00 AM", type: "Follow-up", prakriti: "Vata-Pitta" },
  { id: 2, patient: "New Patient", date: "Jan 3, 2026", time: "11:30 AM", type: "Initial", prakriti: "Unknown" },
  { id: 3, patient: "Rahul Verma", date: "Jan 3, 2026", time: "2:00 PM", type: "Follow-up", prakriti: "Pitta" },
  { id: 4, patient: "Anita Gupta", date: "Jan 3, 2026", time: "4:00 PM", type: "Follow-up", prakriti: "Kapha" },
  { id: 5, patient: "Vikash Kumar", date: "Jan 4, 2026", time: "10:00 AM", type: "Follow-up", prakriti: "Vata" },
  { id: 6, patient: "Meera Patel", date: "Jan 4, 2026", time: "11:30 AM", type: "Follow-up", prakriti: "Pitta-Kapha" },
];

const pendingRequests = [
  { id: 1, patient: "Suresh Reddy", requestedDate: "Jan 5, 2026", time: "10:00 AM", reason: "Respiratory Issues" },
  { id: 2, patient: "Kavita Singh", requestedDate: "Jan 5, 2026", time: "2:00 PM", reason: "Weight Management Consultation" },
];

const DoctorAppointments = () => {
  const [isOnline, setIsOnline] = useState(true);

  const todaysAppointments = upcomingAppointments.filter(apt => apt.date === "Jan 3, 2026");
  const futureAppointments = upcomingAppointments.filter(apt => apt.date !== "Jan 3, 2026");

  return (
    <DoctorLayout 
      doctorName="Dr. Arjun Sharma"
      specialization="BAMS, MD (Ayurveda)"
      pageTitle="Appointments"
      isOnline={isOnline}
      onOnlineChange={setIsOnline}
    >
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Today's Appointments */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Today's Schedule
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {todaysAppointments.length > 0 ? (
                todaysAppointments.map((apt) => (
                  <div 
                    key={apt.id}
                    className="flex items-center justify-between p-4 border border-primary/20 bg-primary/5 rounded-xl"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{apt.patient}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{apt.time}</span>
                          <span>•</span>
                          <Badge variant="secondary">{apt.type}</Badge>
                          {apt.prakriti !== "Unknown" && (
                            <>
                              <span>•</span>
                              <span>{apt.prakriti}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <Button className="gap-2">
                      <Video className="w-4 h-4" />
                      Join Call
                    </Button>
                  </div>
                ))
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  No appointments scheduled for today
                </p>
              )}
            </CardContent>
          </Card>

          {/* Upcoming Appointments */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-accent" />
                Upcoming Appointments
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {futureAppointments.map((apt) => (
                <div 
                  key={apt.id}
                  className="flex items-center justify-between p-4 bg-secondary rounded-xl"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                      <User className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{apt.patient}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{apt.date}</span>
                        <span>•</span>
                        <span>{apt.time}</span>
                        <span>•</span>
                        <Badge variant="secondary">{apt.type}</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Reschedule</Button>
                    <Button variant="ghost" size="sm">Cancel</Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Pending Requests */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Pending Requests</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {pendingRequests.map((request) => (
                <div 
                  key={request.id}
                  className="p-4 bg-secondary rounded-xl"
                >
                  <p className="font-medium text-foreground">{request.patient}</p>
                  <p className="text-sm text-muted-foreground mb-2">
                    {request.requestedDate} at {request.time}
                  </p>
                  <p className="text-sm text-muted-foreground mb-3">
                    Reason: {request.reason}
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1 gap-1">
                      <Check className="w-4 h-4" />
                      Accept
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 gap-1">
                      <X className="w-4 h-4" />
                      Decline
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">This Week</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Total Appointments</span>
                <span className="font-bold text-foreground">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Completed</span>
                <span className="font-bold text-green-600">8</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Remaining</span>
                <span className="font-bold text-primary">4</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Cancelled</span>
                <span className="font-bold text-red-500">0</span>
              </div>
            </CardContent>
          </Card>

          {/* Availability */}
          <Card className={isOnline ? "bg-green-500/5 border-green-500/20" : "bg-muted"}>
            <CardContent className="pt-6 text-center">
              <div className="text-4xl mb-2">{isOnline ? "✅" : "⏸️"}</div>
              <p className="font-medium text-foreground">
                {isOnline ? "Accepting Appointments" : "Not Available"}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Toggle your status in the header
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DoctorLayout>
  );
};

export default DoctorAppointments;
