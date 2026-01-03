import { useState } from "react";
import DoctorLayout from "@/components/dashboard/DoctorLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, MessageCircle, FileText, User } from "lucide-react";

const allPatients = [
  { id: 1, name: "Priya Sharma", age: 32, prakriti: "Vata-Pitta", condition: "Digestive Issues", severity: "moderate", lastVisit: "Dec 28, 2025", visits: 5 },
  { id: 2, name: "Rahul Verma", age: 45, prakriti: "Pitta", condition: "Stress & Anxiety", severity: "mild", lastVisit: "Dec 26, 2025", visits: 3 },
  { id: 3, name: "Anita Gupta", age: 28, prakriti: "Kapha", condition: "Skin Problems", severity: "severe", lastVisit: "Dec 25, 2025", visits: 8 },
  { id: 4, name: "Vikash Kumar", age: 55, prakriti: "Vata", condition: "Joint Pain", severity: "moderate", lastVisit: "Dec 24, 2025", visits: 12 },
  { id: 5, name: "Meera Patel", age: 38, prakriti: "Pitta-Kapha", condition: "Immunity Boost", severity: "mild", lastVisit: "Dec 22, 2025", visits: 2 },
  { id: 6, name: "Suresh Reddy", age: 42, prakriti: "Vata-Kapha", condition: "Respiratory Issues", severity: "moderate", lastVisit: "Dec 20, 2025", visits: 6 },
  { id: 7, name: "Kavita Singh", age: 35, prakriti: "Pitta", condition: "Weight Management", severity: "mild", lastVisit: "Dec 18, 2025", visits: 4 },
  { id: 8, name: "Deepak Joshi", age: 60, prakriti: "Kapha", condition: "Diabetes Management", severity: "severe", lastVisit: "Dec 15, 2025", visits: 15 },
];

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "mild": return "bg-green-500/10 text-green-600 border-green-500/20";
    case "moderate": return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20";
    case "severe": return "bg-red-500/10 text-red-600 border-red-500/20";
    default: return "bg-muted text-muted-foreground";
  }
};

const DoctorPatients = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOnline, setIsOnline] = useState(true);

  const filteredPatients = allPatients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.condition.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DoctorLayout 
      doctorName="Dr. Arjun Sharma"
      specialization="BAMS, MD (Ayurveda)"
      pageTitle="Patients"
      isOnline={isOnline}
      onOnlineChange={setIsOnline}
    >
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-3xl font-serif font-bold text-foreground">{allPatients.length}</p>
            <p className="text-sm text-muted-foreground">Total Patients</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-3xl font-serif font-bold text-primary">12</p>
            <p className="text-sm text-muted-foreground">This Week</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-3xl font-serif font-bold text-accent">3</p>
            <p className="text-sm text-muted-foreground">New Today</p>
          </CardContent>
        </Card>
      </div>

      {/* Patient List */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>All Patients</CardTitle>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search patients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Prakriti</TableHead>
                <TableHead>Condition</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Visits</TableHead>
                <TableHead>Last Visit</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="w-4 h-4 text-primary" />
                      </div>
                      <span className="font-medium">{patient.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{patient.age}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{patient.prakriti}</Badge>
                  </TableCell>
                  <TableCell>{patient.condition}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getSeverityColor(patient.severity)}>
                      {patient.severity}
                    </Badge>
                  </TableCell>
                  <TableCell>{patient.visits}</TableCell>
                  <TableCell className="text-muted-foreground">{patient.lastVisit}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <MessageCircle className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <FileText className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </DoctorLayout>
  );
};

export default DoctorPatients;
