import { useState, useEffect } from "react";
import DoctorLayout from "@/components/dashboard/DoctorLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Search, FileText, User, Leaf, Activity, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

interface SymptomCheck {
  id: string;
  patient_name: string;
  patient_email: string;
  symptoms: string[];
  dominant_dosha: string;
  herbs_recommended: string[] | null;
  lifestyle_recommendations: string[] | null;
  diet_recommendations: string[] | null;
  ai_response: string | null;
  created_at: string;
}

interface PatientSummary {
  email: string;
  name: string;
  checkCount: number;
  lastCheck: string;
  dominantDosha: string;
  checks: SymptomCheck[];
}

const getDoshaColor = (dosha: string) => {
  switch (dosha?.toLowerCase()) {
    case 'vata': return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
    case 'pitta': return 'bg-red-500/10 text-red-600 border-red-500/20';
    case 'kapha': return 'bg-green-500/10 text-green-600 border-green-500/20';
    default: return 'bg-muted text-muted-foreground';
  }
};

const DoctorPatients = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOnline, setIsOnline] = useState(true);
  const [symptomChecks, setSymptomChecks] = useState<SymptomCheck[]>([]);
  const [patients, setPatients] = useState<PatientSummary[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<PatientSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchSymptomChecks();
  }, []);

  const fetchSymptomChecks = async () => {
    try {
      const { data, error } = await supabase
        .from('symptom_checks')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setSymptomChecks(data || []);

      // Group by patient email
      const patientMap = new Map<string, PatientSummary>();
      (data || []).forEach((check: SymptomCheck) => {
        const existing = patientMap.get(check.patient_email);
        if (existing) {
          existing.checkCount++;
          existing.checks.push(check);
        } else {
          patientMap.set(check.patient_email, {
            email: check.patient_email,
            name: check.patient_name,
            checkCount: 1,
            lastCheck: check.created_at,
            dominantDosha: check.dominant_dosha,
            checks: [check],
          });
        }
      });

      setPatients(Array.from(patientMap.values()));
    } catch (error) {
      console.error('Error fetching symptom checks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchQuery.toLowerCase())
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
            <p className="text-3xl font-serif font-bold text-foreground">{patients.length}</p>
            <p className="text-sm text-muted-foreground">Total Patients</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-3xl font-serif font-bold text-primary">{symptomChecks.length}</p>
            <p className="text-sm text-muted-foreground">Symptom Checks</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-3xl font-serif font-bold text-accent">
              {symptomChecks.filter(c => {
                const checkDate = new Date(c.created_at);
                const today = new Date();
                return checkDate.toDateString() === today.toDateString();
              }).length}
            </p>
            <p className="text-sm text-muted-foreground">Today's Checks</p>
          </CardContent>
        </Card>
      </div>

      {/* Patient List */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Patient Symptom History</CardTitle>
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
          {isLoading ? (
            <div className="text-center py-8 text-muted-foreground">Loading...</div>
          ) : patients.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Activity className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No patient symptom data yet.</p>
              <p className="text-sm">Patients will appear here after they complete a symptom check.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Dominant Dosha</TableHead>
                  <TableHead>Symptom Checks</TableHead>
                  <TableHead>Last Check</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPatients.map((patient) => (
                  <TableRow key={patient.email}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="w-4 h-4 text-primary" />
                        </div>
                        <span className="font-medium">{patient.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{patient.email}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getDoshaColor(patient.dominantDosha)}>
                        {patient.dominantDosha}
                      </Badge>
                    </TableCell>
                    <TableCell>{patient.checkCount}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {format(new Date(patient.lastCheck), 'MMM dd, yyyy')}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSelectedPatient(patient)}
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        View History
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Patient Detail Dialog */}
      <Dialog open={!!selectedPatient} onOpenChange={() => setSelectedPatient(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              {selectedPatient?.name}'s Symptom History
            </DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh]">
            <div className="space-y-4 pr-4">
              {selectedPatient?.checks.map((check) => (
                <Card key={check.id} className="border-border">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        {format(new Date(check.created_at), 'MMM dd, yyyy • h:mm a')}
                      </CardTitle>
                      <Badge variant="outline" className={getDoshaColor(check.dominant_dosha)}>
                        {check.dominant_dosha} Imbalance
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Symptoms */}
                    <div>
                      <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                        <Activity className="w-4 h-4 text-primary" />
                        Reported Symptoms
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {check.symptoms.map((symptom, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {symptom}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Herbs Recommended */}
                    {check.herbs_recommended && check.herbs_recommended.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                          <Leaf className="w-4 h-4 text-primary" />
                          Herbs Recommended
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {check.herbs_recommended.map((herb, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs bg-primary/5">
                              {herb}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Lifestyle Recommendations */}
                    {check.lifestyle_recommendations && check.lifestyle_recommendations.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium mb-2">Lifestyle Recommendations</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {check.lifestyle_recommendations.slice(0, 3).map((tip, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-primary">•</span>
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Diet Recommendations */}
                    {check.diet_recommendations && check.diet_recommendations.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium mb-2">Diet Recommendations</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {check.diet_recommendations.slice(0, 3).map((tip, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-primary">•</span>
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* AI Response */}
                    {check.ai_response && (
                      <div className="bg-muted/50 rounded-lg p-3">
                        <h4 className="text-sm font-medium mb-2">AI Vaidya Response</h4>
                        <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                          {check.ai_response}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </DoctorLayout>
  );
};

export default DoctorPatients;