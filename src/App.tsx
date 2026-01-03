import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import PatientDashboard from "./pages/dashboard/PatientDashboard";
import DoctorDashboard from "./pages/dashboard/DoctorDashboard";
import DoctorPatients from "./pages/dashboard/DoctorPatients";
import DoctorAppointments from "./pages/dashboard/DoctorAppointments";
import DoctorPrescriptions from "./pages/dashboard/DoctorPrescriptions";
import PrakritiQuiz from "./pages/dashboard/PrakritiQuiz";
import DailyRituals from "./pages/dashboard/DailyRituals";
import Appointments from "./pages/dashboard/Appointments";
import Chat from "./pages/Chat";
import Products from "./pages/Products";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard/patient" element={<PatientDashboard />} />
          <Route path="/dashboard/patient/prakriti" element={<PrakritiQuiz />} />
          <Route path="/dashboard/patient/rituals" element={<DailyRituals />} />
          <Route path="/dashboard/patient/appointments" element={<Appointments />} />
          <Route path="/dashboard/doctor" element={<DoctorDashboard />} />
          <Route path="/dashboard/doctor/patients" element={<DoctorPatients />} />
          <Route path="/dashboard/doctor/appointments" element={<DoctorAppointments />} />
          <Route path="/dashboard/doctor/prescriptions" element={<DoctorPrescriptions />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/products" element={<Products />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
