-- Create symptom_checks table to store patient symptom analysis
CREATE TABLE public.symptom_checks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_name TEXT NOT NULL,
  patient_email TEXT NOT NULL,
  symptoms TEXT[] NOT NULL,
  dominant_dosha TEXT NOT NULL,
  herbs_recommended TEXT[],
  lifestyle_recommendations TEXT[],
  diet_recommendations TEXT[],
  ai_response TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.symptom_checks ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert symptom checks (patients submitting their data)
CREATE POLICY "Anyone can create symptom checks"
ON public.symptom_checks
FOR INSERT
WITH CHECK (true);

-- Allow anyone to view symptom checks (doctors viewing patient history)
CREATE POLICY "Symptom checks are publicly viewable"
ON public.symptom_checks
FOR SELECT
USING (true);

-- Allow updates to add AI response
CREATE POLICY "Anyone can update symptom checks"
ON public.symptom_checks
FOR UPDATE
USING (true);