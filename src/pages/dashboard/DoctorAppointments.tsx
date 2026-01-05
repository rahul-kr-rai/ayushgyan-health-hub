import { useState, useEffect } from "react";
import DoctorLayout from "@/components/dashboard/DoctorLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Video, User, Check, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { format, isToday, isFuture } from "date-fns";

interface Appointment {
  id: string;
  patient_name: string;
  patient_email: string;
  appointment_date: string;
  appointment_time: string;
  reason: string;
  status: string;
  notes: string;
}

const DoctorAppointments = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    const { data, error } = await supabase
      .from("appointments")
      .select("*")
      .order("appointment_date", { ascending: true });
    
    setLoading(false);
    
    if (error) {
      toast({ title: "Error fetching appointments", description: error.message, variant: "destructive" });
    } else {
      setAppointments(data || []);
    }
  };

  const updateAppointmentStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from("appointments")
      .update({ status })
      .eq("id", id);

    if (error) {
      toast({ title: "Error updating appointment", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Appointment updated", description: `Status changed to ${status}` });
      fetchAppointments();
    }
  };

  const todaysAppointments = appointments.filter(apt => 
    isToday(new Date(apt.appointment_date)) && apt.status !== "cancelled"
  );
  
  const futureAppointments = appointments.filter(apt => 
    isFuture(new Date(apt.appointment_date)) && !isToday(new Date(apt.appointment_date)) && apt.status !== "cancelled"
  );
  
  const pendingRequests = appointments.filter(apt => apt.status === "pending");

  const confirmedCount = appointments.filter(apt => apt.status === "confirmed").length;
  const completedCount = appointments.filter(apt => apt.status === "completed").length;
  const cancelledCount = appointments.filter(apt => apt.status === "cancelled").length;

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
              {loading ? (
                <p className="text-center text-muted-foreground py-8">Loading...</p>
              ) : todaysAppointments.length > 0 ? (
                todaysAppointments.map((apt) => (
                  <div 
                    key={apt.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-primary/20 bg-primary/5 rounded-xl gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{apt.patient_name}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{apt.appointment_time}</span>
                          <span>•</span>
                          <Badge variant={apt.status === "confirmed" ? "default" : "secondary"}>
                            {apt.status}
                          </Badge>
                        </div>
                        {apt.reason && (
                          <p className="text-sm text-muted-foreground mt-1">{apt.reason}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {apt.status === "pending" && (
                        <>
                          <Button size="sm" onClick={() => updateAppointmentStatus(apt.id, "confirmed")}>
                            <Check className="w-4 h-4 mr-1" /> Confirm
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => updateAppointmentStatus(apt.id, "cancelled")}>
                            <X className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                      {apt.status === "confirmed" && (
                        <>
                          <Button className="gap-2">
                            <Video className="w-4 h-4" />
                            Join Call
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => updateAppointmentStatus(apt.id, "completed")}>
                            Complete
                          </Button>
                        </>
                      )}
                    </div>
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
              {futureAppointments.length > 0 ? (
                futureAppointments.map((apt) => (
                  <div 
                    key={apt.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-secondary rounded-xl gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                        <User className="w-6 h-6 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{apt.patient_name}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{format(new Date(apt.appointment_date), "MMM d, yyyy")}</span>
                          <span>•</span>
                          <span>{apt.appointment_time}</span>
                          <span>•</span>
                          <Badge variant="secondary">{apt.status}</Badge>
                        </div>
                        {apt.reason && (
                          <p className="text-sm text-muted-foreground mt-1">{apt.reason}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {apt.status === "pending" && (
                        <>
                          <Button size="sm" onClick={() => updateAppointmentStatus(apt.id, "confirmed")}>
                            <Check className="w-4 h-4 mr-1" /> Confirm
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => updateAppointmentStatus(apt.id, "cancelled")}>
                            Decline
                          </Button>
                        </>
                      )}
                      {apt.status === "confirmed" && (
                        <Button variant="ghost" size="sm" onClick={() => updateAppointmentStatus(apt.id, "cancelled")}>
                          Cancel
                        </Button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  No upcoming appointments
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Pending Requests */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Pending Requests ({pendingRequests.length})</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {pendingRequests.length > 0 ? (
                pendingRequests.slice(0, 3).map((request) => (
                  <div 
                    key={request.id}
                    className="p-4 bg-secondary rounded-xl"
                  >
                    <p className="font-medium text-foreground">{request.patient_name}</p>
                    <p className="text-sm text-muted-foreground mb-2">
                      {format(new Date(request.appointment_date), "MMM d, yyyy")} at {request.appointment_time}
                    </p>
                    {request.reason && (
                      <p className="text-sm text-muted-foreground mb-3 truncate">
                        Reason: {request.reason}
                      </p>
                    )}
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1 gap-1" onClick={() => updateAppointmentStatus(request.id, "confirmed")}>
                        <Check className="w-4 h-4" />
                        Accept
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 gap-1" onClick={() => updateAppointmentStatus(request.id, "cancelled")}>
                        <X className="w-4 h-4" />
                        Decline
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-muted-foreground py-4">No pending requests</p>
              )}
            </CardContent>
          </Card>

          {/* Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Total Appointments</span>
                <span className="font-bold text-foreground">{appointments.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Confirmed</span>
                <span className="font-bold text-primary">{confirmedCount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Completed</span>
                <span className="font-bold text-green-600">{completedCount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Cancelled</span>
                <span className="font-bold text-red-500">{cancelledCount}</span>
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