export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  condition: string;
  status: 'Active' | 'Critical' | 'Stable' | 'Discharged';
  doctor: string;
  admittedOn: string;
  avatar: string;
  bloodGroup: string;
  phone: string;
  email: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: { name: string; role: string; email: string } | null;
  loading: boolean;
}

export interface DashboardStats {
  totalPatients: number;
  activeCases: number;
  criticalCases: number;
  recovered: number;
  todayAppointments: number;
  availableDoctors: number;
}

export type ViewMode = 'grid' | 'list';