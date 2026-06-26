import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Profile = {
  id: string
  first_name: string
  last_name: string
  phone: string | null
  date_of_birth: string | null
  address: string | null
  emergency_contact_name: string | null
  emergency_contact_phone: string | null
  created_at: string
  updated_at: string
}

export type Doctor = {
  id: string
  name: string
  specialty: string
  bio: string | null
  image_url: string | null
  is_active: boolean
  created_at: string
}

export type Service = {
  id: string
  name: string
  description: string | null
  icon: string | null
  category: string | null
  display_order: number
  is_active: boolean
  created_at: string
}

export type Appointment = {
  id: string
  patient_id: string
  doctor_id: string | null
  service_id: string | null
  appointment_date: string
  time_slot: string
  reason: string | null
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  notes: string | null
  created_at: string
  updated_at: string
}

export type Vital = {
  id: string
  patient_id: string
  blood_pressure_systolic: number | null
  blood_pressure_diastolic: number | null
  heart_rate: number | null
  weight: number | null
  height: number | null
  bmi: number | null
  recorded_at: string
  notes: string | null
  created_at: string
}

export type ContactMessage = {
  id: string
  name: string
  email: string
  subject: string
  message: string
  is_read: boolean
  created_at: string
}

export type Testimonial = {
  id: string
  patient_name: string
  quote: string
  rating: number
  is_approved: boolean
  display_order: number
  created_at: string
}

export type AppointmentWithDetails = Appointment & {
  doctors?: Doctor | null
  services?: Service | null
}
