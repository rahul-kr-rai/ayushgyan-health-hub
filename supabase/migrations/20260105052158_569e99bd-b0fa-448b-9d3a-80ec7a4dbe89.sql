-- Create doctors table
CREATE TABLE public.doctors (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  specialty TEXT NOT NULL,
  qualifications TEXT NOT NULL,
  experience_years INTEGER NOT NULL DEFAULT 0,
  consultation_fee INTEGER NOT NULL DEFAULT 500,
  avatar_url TEXT,
  bio TEXT,
  languages TEXT[] DEFAULT ARRAY['English', 'Hindi'],
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create appointments table
CREATE TABLE public.appointments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_name TEXT NOT NULL,
  patient_email TEXT NOT NULL,
  doctor_id UUID REFERENCES public.doctors(id) ON DELETE CASCADE NOT NULL,
  appointment_date DATE NOT NULL,
  appointment_time TEXT NOT NULL,
  reason TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- Doctors are publicly viewable
CREATE POLICY "Doctors are publicly viewable" 
ON public.doctors 
FOR SELECT 
USING (true);

-- Appointments are publicly viewable (for demo - in production, would be user-specific)
CREATE POLICY "Appointments are publicly viewable" 
ON public.appointments 
FOR SELECT 
USING (true);

-- Anyone can create appointments (for demo)
CREATE POLICY "Anyone can create appointments" 
ON public.appointments 
FOR INSERT 
WITH CHECK (true);

-- Anyone can update appointments (for demo)
CREATE POLICY "Anyone can update appointments" 
ON public.appointments 
FOR UPDATE 
USING (true);

-- Insert sample doctors
INSERT INTO public.doctors (name, specialty, qualifications, experience_years, consultation_fee, bio, languages) VALUES
('Dr. Arjun Sharma', 'Digestive Health & Detox', 'BAMS, MD (Ayurveda)', 15, 800, 'Expert in Panchakarma therapies and digestive disorders. Specializes in gut health restoration using traditional Ayurvedic methods.', ARRAY['English', 'Hindi', 'Sanskrit']),
('Dr. Meera Patel', 'Womens Health & Hormones', 'BAMS, MS (Prasuti Tantra)', 12, 750, 'Specialist in women''s reproductive health, PCOS management, and hormonal balance through Ayurvedic treatments.', ARRAY['English', 'Hindi', 'Gujarati']),
('Dr. Vikram Singh', 'Stress & Mental Wellness', 'BAMS, PhD (Manas Roga)', 18, 900, 'Pioneer in Ayurvedic psychiatry, treating anxiety, depression, and sleep disorders with herbal remedies and lifestyle modifications.', ARRAY['English', 'Hindi', 'Punjabi']),
('Dr. Priya Nair', 'Skin & Hair Care', 'BAMS, MD (Kayachikitsa)', 10, 700, 'Specializes in treating chronic skin conditions like psoriasis, eczema, and hair loss using personalized Ayurvedic protocols.', ARRAY['English', 'Hindi', 'Malayalam']),
('Dr. Rajesh Kumar', 'Joint & Bone Health', 'BAMS, MS (Shalya Tantra)', 20, 850, 'Expert in treating arthritis, back pain, and sports injuries through Ayurvedic therapies and Marma treatments.', ARRAY['English', 'Hindi']);