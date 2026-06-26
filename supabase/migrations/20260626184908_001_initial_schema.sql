/*
# MED+ Medical Clinic - Initial Schema

This migration creates the foundational tables for a fully functional medical clinic website.

## Tables Created:

1. `profiles` - Extends auth.users with patient information
   - id (uuid, PK, references auth.users)
   - first_name, last_name, phone, date_of_birth
   - address, emergency_contact
   - created_at, updated_at

2. `doctors` - Clinic doctors/providers (publicly viewable)
   - id, name, specialty, bio, image_url
   - is_active, created_at

3. `services` - Medical services offered (publicly viewable)
   - id, name, description, icon, category
   - display_order, is_active, created_at

4. `appointments` - Patient appointments (user-scoped)
   - id, patient_id (FK to profiles), doctor_id (FK)
   - service_id (FK), appointment_date, time_slot
   - reason, status, notes
   - created_at, updated_at

5. `vitals` - Patient health vitals records (user-scoped)
   - id, patient_id (FK)
   - blood_pressure_systolic, blood_pressure_diastolic
   - heart_rate, weight, height, bmi
   - recorded_at, notes

6. `contact_messages` - Contact form submissions (public write)
   - id, name, email, subject, message
   - is_read, created_at

7. `testimonials` - Patient testimonials (publicly viewable)
   - id, patient_name, quote, rating
   - is_approved, display_order, created_at

## Security:
- RLS enabled on all tables
- User-scoped tables (appointments, vitals, profiles) use auth.uid() ownership checks
- Public tables (doctors, services, testimonials) allow anon + authenticated read
- Contact messages allow anon insert for the contact form
*/

-- Profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name text NOT NULL,
  last_name text NOT NULL,
  phone text,
  date_of_birth date,
  address text,
  emergency_contact_name text,
  emergency_contact_phone text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "profiles_select_own" ON profiles;
CREATE POLICY "profiles_select_own" ON profiles FOR SELECT
  TO authenticated USING (auth.uid() = id);

DROP POLICY IF EXISTS "profiles_insert_own" ON profiles;
CREATE POLICY "profiles_insert_own" ON profiles FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "profiles_update_own" ON profiles;
CREATE POLICY "profiles_update_own" ON profiles FOR UPDATE
  TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- Doctors table (publicly viewable)
CREATE TABLE IF NOT EXISTS doctors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  specialty text NOT NULL,
  bio text,
  image_url text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE doctors ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "doctors_read_public" ON doctors;
CREATE POLICY "doctors_read_public" ON doctors FOR SELECT
  TO anon, authenticated USING (is_active = true);

DROP POLICY IF EXISTS "doctors_insert_authenticated" ON doctors;
CREATE POLICY "doctors_insert_authenticated" ON doctors FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "doctors_update_authenticated" ON doctors;
CREATE POLICY "doctors_update_authenticated" ON doctors FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

-- Services table (publicly viewable)
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  icon text,
  category text,
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE services ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "services_read_public" ON services;
CREATE POLICY "services_read_public" ON services FOR SELECT
  TO anon, authenticated USING (is_active = true);

DROP POLICY IF EXISTS "services_insert_authenticated" ON services;
CREATE POLICY "services_insert_authenticated" ON services FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "services_update_authenticated" ON services;
CREATE POLICY "services_update_authenticated" ON services FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

-- Appointments table (user-scoped)
CREATE TABLE IF NOT EXISTS appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid NOT NULL DEFAULT auth.uid() REFERENCES profiles(id) ON DELETE CASCADE,
  doctor_id uuid REFERENCES doctors(id) ON DELETE SET NULL,
  service_id uuid REFERENCES services(id) ON DELETE SET NULL,
  appointment_date date NOT NULL,
  time_slot text NOT NULL,
  reason text,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "appointments_select_own" ON appointments;
CREATE POLICY "appointments_select_own" ON appointments FOR SELECT
  TO authenticated USING (auth.uid() = patient_id);

DROP POLICY IF EXISTS "appointments_insert_own" ON appointments;
CREATE POLICY "appointments_insert_own" ON appointments FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = patient_id);

DROP POLICY IF EXISTS "appointments_update_own" ON appointments;
CREATE POLICY "appointments_update_own" ON appointments FOR UPDATE
  TO authenticated USING (auth.uid() = patient_id) WITH CHECK (auth.uid() = patient_id);

DROP POLICY IF EXISTS "appointments_delete_own" ON appointments;
CREATE POLICY "appointments_delete_own" ON appointments FOR DELETE
  TO authenticated USING (auth.uid() = patient_id);

-- Vitals table (user-scoped)
CREATE TABLE IF NOT EXISTS vitals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid NOT NULL DEFAULT auth.uid() REFERENCES profiles(id) ON DELETE CASCADE,
  blood_pressure_systolic integer,
  blood_pressure_diastolic integer,
  heart_rate integer,
  weight decimal(5,1),
  height decimal(5,1),
  bmi decimal(4,1),
  recorded_at timestamptz DEFAULT now(),
  notes text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE vitals ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "vitals_select_own" ON vitals;
CREATE POLICY "vitals_select_own" ON vitals FOR SELECT
  TO authenticated USING (auth.uid() = patient_id);

DROP POLICY IF EXISTS "vitals_insert_own" ON vitals;
CREATE POLICY "vitals_insert_own" ON vitals FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = patient_id);

DROP POLICY IF EXISTS "vitals_update_own" ON vitals;
CREATE POLICY "vitals_update_own" ON vitals FOR UPDATE
  TO authenticated USING (auth.uid() = patient_id) WITH CHECK (auth.uid() = patient_id);

DROP POLICY IF EXISTS "vitals_delete_own" ON vitals;
CREATE POLICY "vitals_delete_own" ON vitals FOR DELETE
  TO authenticated USING (auth.uid() = patient_id);

-- Contact messages table (public write for contact form)
CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  is_read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "contact_messages_insert_public" ON contact_messages;
CREATE POLICY "contact_messages_insert_public" ON contact_messages FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "contact_messages_select_authenticated" ON contact_messages;
CREATE POLICY "contact_messages_select_authenticated" ON contact_messages FOR SELECT
  TO authenticated USING (true);

-- Testimonials table (publicly viewable)
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_name text NOT NULL,
  quote text NOT NULL,
  rating integer DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  is_approved boolean DEFAULT false,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "testimonials_read_approved" ON testimonials;
CREATE POLICY "testimonials_read_approved" ON testimonials FOR SELECT
  TO anon, authenticated USING (is_approved = true);

DROP POLICY IF EXISTS "testimonials_insert_authenticated" ON testimonials;
CREATE POLICY "testimonials_insert_authenticated" ON testimonials FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "testimonials_update_authenticated" ON testimonials;
CREATE POLICY "testimonials_update_authenticated" ON testimonials FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_appointments_patient_id ON appointments(patient_id);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(appointment_date);
CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointments(status);
CREATE INDEX IF NOT EXISTS idx_vitals_patient_id ON vitals(patient_id);
CREATE INDEX IF NOT EXISTS idx_vitals_recorded_at ON vitals(recorded_at);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at);
CREATE INDEX IF NOT EXISTS idx_doctors_specialty ON doctors(specialty);
CREATE INDEX IF NOT EXISTS idx_services_category ON services(category);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at triggers
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_appointments_updated_at ON appointments;
CREATE TRIGGER update_appointments_updated_at
  BEFORE UPDATE ON appointments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();