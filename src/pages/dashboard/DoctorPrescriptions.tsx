import { useState } from "react";
import DoctorLayout from "@/components/dashboard/DoctorLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { FileText, Plus, Printer, Send } from "lucide-react";

const recentPrescriptions = [
  { id: 1, patient: "Priya Sharma", date: "Dec 28, 2025", medicines: 3, status: "sent" },
  { id: 2, patient: "Rahul Verma", date: "Dec 26, 2025", medicines: 2, status: "sent" },
  { id: 3, patient: "Anita Gupta", date: "Dec 25, 2025", medicines: 4, status: "draft" },
  { id: 4, patient: "Vikash Kumar", date: "Dec 24, 2025", medicines: 2, status: "sent" },
];

const patients = [
  "Priya Sharma",
  "Rahul Verma",
  "Anita Gupta",
  "Vikash Kumar",
  "Meera Patel",
];

const DoctorPrescriptions = () => {
  const { toast } = useToast();
  const [isOnline, setIsOnline] = useState(true);
  const [selectedPatient, setSelectedPatient] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [medicines, setMedicines] = useState([
    { name: "", dosage: "", duration: "", instructions: "" }
  ]);
  const [dietaryAdvice, setDietaryAdvice] = useState("");
  const [lifestyleAdvice, setLifestyleAdvice] = useState("");

  const addMedicine = () => {
    setMedicines([...medicines, { name: "", dosage: "", duration: "", instructions: "" }]);
  };

  const updateMedicine = (index: number, field: string, value: string) => {
    const updated = [...medicines];
    updated[index] = { ...updated[index], [field]: value };
    setMedicines(updated);
  };

  const handleSubmit = () => {
    if (!selectedPatient || !diagnosis) {
      toast({
        title: "Missing Information",
        description: "Please select a patient and add diagnosis.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Prescription Saved",
      description: `Prescription for ${selectedPatient} has been saved and sent.`,
    });

    // Reset form
    setSelectedPatient("");
    setDiagnosis("");
    setMedicines([{ name: "", dosage: "", duration: "", instructions: "" }]);
    setDietaryAdvice("");
    setLifestyleAdvice("");
  };

  return (
    <DoctorLayout 
      doctorName="Dr. Arjun Sharma"
      specialization="BAMS, MD (Ayurveda)"
      pageTitle="Prescriptions"
      isOnline={isOnline}
      onOnlineChange={setIsOnline}
    >
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Prescription Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                New Prescription
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Patient Selection */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Patient</Label>
                  <Select value={selectedPatient} onValueChange={setSelectedPatient}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select patient" />
                    </SelectTrigger>
                    <SelectContent>
                      {patients.map((patient) => (
                        <SelectItem key={patient} value={patient}>
                          {patient}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Input type="date" defaultValue={new Date().toISOString().split('T')[0]} />
                </div>
              </div>

              {/* Diagnosis */}
              <div className="space-y-2">
                <Label>Diagnosis (Ayurvedic)</Label>
                <Textarea 
                  placeholder="E.g., Vata imbalance causing Agnimandya (low digestive fire)..."
                  value={diagnosis}
                  onChange={(e) => setDiagnosis(e.target.value)}
                />
              </div>

              {/* Medicines */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Medicines & Herbs</Label>
                  <Button variant="outline" size="sm" onClick={addMedicine}>
                    <Plus className="w-4 h-4 mr-1" /> Add Medicine
                  </Button>
                </div>
                
                {medicines.map((medicine, index) => (
                  <div key={index} className="grid grid-cols-4 gap-3 p-4 bg-secondary rounded-lg">
                    <Input
                      placeholder="Medicine name"
                      value={medicine.name}
                      onChange={(e) => updateMedicine(index, "name", e.target.value)}
                    />
                    <Input
                      placeholder="Dosage (e.g., 500mg)"
                      value={medicine.dosage}
                      onChange={(e) => updateMedicine(index, "dosage", e.target.value)}
                    />
                    <Input
                      placeholder="Duration"
                      value={medicine.duration}
                      onChange={(e) => updateMedicine(index, "duration", e.target.value)}
                    />
                    <Input
                      placeholder="Instructions"
                      value={medicine.instructions}
                      onChange={(e) => updateMedicine(index, "instructions", e.target.value)}
                    />
                  </div>
                ))}
              </div>

              {/* Dietary Advice */}
              <div className="space-y-2">
                <Label>Dietary Recommendations (Ahara)</Label>
                <Textarea 
                  placeholder="Foods to eat, foods to avoid, meal timing..."
                  value={dietaryAdvice}
                  onChange={(e) => setDietaryAdvice(e.target.value)}
                />
              </div>

              {/* Lifestyle Advice */}
              <div className="space-y-2">
                <Label>Lifestyle Recommendations (Vihara)</Label>
                <Textarea 
                  placeholder="Daily routine, yoga, pranayama, sleep schedule..."
                  value={lifestyleAdvice}
                  onChange={(e) => setLifestyleAdvice(e.target.value)}
                />
              </div>

              {/* Actions */}
              <div className="flex gap-4 pt-4">
                <Button onClick={handleSubmit} className="gap-2">
                  <Send className="w-4 h-4" />
                  Save & Send
                </Button>
                <Button variant="outline" className="gap-2">
                  <Printer className="w-4 h-4" />
                  Print
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Prescriptions */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Prescriptions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentPrescriptions.map((prescription) => (
                <div 
                  key={prescription.id}
                  className="p-4 bg-secondary rounded-xl"
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-foreground">{prescription.patient}</p>
                    <Badge variant={prescription.status === "sent" ? "default" : "secondary"}>
                      {prescription.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {prescription.date} • {prescription.medicines} medicines
                  </p>
                  <Button variant="ghost" size="sm" className="mt-2 w-full">
                    View Details
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Templates */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Templates</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                🌿 Digestive Health Protocol
              </Button>
              <Button variant="outline" className="w-full justify-start">
                🧘 Stress Management Protocol
              </Button>
              <Button variant="outline" className="w-full justify-start">
                💪 Immunity Boost Protocol
              </Button>
              <Button variant="outline" className="w-full justify-start">
                😴 Sleep Enhancement Protocol
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DoctorLayout>
  );
};

export default DoctorPrescriptions;
