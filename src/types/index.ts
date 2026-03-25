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

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  role: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: AuthUser | null;
  loading: boolean;
  sessionChecked: boolean; 
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