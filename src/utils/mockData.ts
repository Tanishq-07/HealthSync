import { Patient, DashboardStats } from '../types';

export const mockPatients: Patient[] = [
  { id:'P001', name:'Aarav Sharma', age:34, gender:'Male', condition:'Hypertension', status:'Active', doctor:'Dr. Priya Mehta', admittedOn:'2024-03-10', avatar:'AS', bloodGroup:'A+', phone:'+91 98765 43210', email:'aarav@email.com' },
  { id:'P002', name:'Sneha Reddy', age:27, gender:'Female', condition:'Diabetes Type 2', status:'Stable', doctor:'Dr. Rahul Gupta', admittedOn:'2024-03-12', avatar:'SR', bloodGroup:'B+', phone:'+91 87654 32109', email:'sneha@email.com' },
  { id:'P003', name:'Mohammed Ali', age:58, gender:'Male', condition:'Cardiac Arrest', status:'Critical', doctor:'Dr. Anjali Singh', admittedOn:'2024-03-14', avatar:'MA', bloodGroup:'O-', phone:'+91 76543 21098', email:'mali@email.com' },
  { id:'P004', name:'Kavya Nair', age:45, gender:'Female', condition:'Fracture - Left Arm', status:'Active', doctor:'Dr. Vikram Patel', admittedOn:'2024-03-08', avatar:'KN', bloodGroup:'AB+', phone:'+91 65432 10987', email:'kavya@email.com' },
  { id:'P005', name:'Rohan Desai', age:22, gender:'Male', condition:'Appendicitis', status:'Discharged', doctor:'Dr. Priya Mehta', admittedOn:'2024-03-01', avatar:'RD', bloodGroup:'A-', phone:'+91 54321 09876', email:'rohan@email.com' },
  { id:'P006', name:'Lakshmi Iyer', age:65, gender:'Female', condition:'Pneumonia', status:'Critical', doctor:'Dr. Anjali Singh', admittedOn:'2024-03-15', avatar:'LI', bloodGroup:'B-', phone:'+91 43210 98765', email:'lakshmi@email.com' },
  { id:'P007', name:'Arjun Kapoor', age:39, gender:'Male', condition:'Migraine', status:'Stable', doctor:'Dr. Rahul Gupta', admittedOn:'2024-03-13', avatar:'AK', bloodGroup:'O+', phone:'+91 32109 87654', email:'arjun@email.com' },
  { id:'P008', name:'Divya Pillai', age:31, gender:'Female', condition:'Thyroid Disorder', status:'Active', doctor:'Dr. Vikram Patel', admittedOn:'2024-03-11', avatar:'DP', bloodGroup:'A+', phone:'+91 21098 76543', email:'divya@email.com' },
];

export const mockStats: DashboardStats = {
  totalPatients: 248,
  activeCases: 89,
  criticalCases: 12,
  recovered: 147,
  todayAppointments: 34,
  availableDoctors: 18,
};

export const analyticsData = {
  monthly: [
    { month:'Oct', admissions:65, discharges:58, critical:8 },
    { month:'Nov', admissions:72, discharges:67, critical:11 },
    { month:'Dec', admissions:80, discharges:75, critical:14 },
    { month:'Jan', admissions:69, discharges:72, critical:9 },
    { month:'Feb', admissions:78, discharges:70, critical:13 },
    { month:'Mar', admissions:91, discharges:82, critical:12 },
  ],
  conditionDistribution: [
    { name:'Cardiac', value:22 },
    { name:'Diabetes', value:18 },
    { name:'Respiratory', value:15 },
    { name:'Orthopedic', value:20 },
    { name:'Neurological', value:13 },
    { name:'Others', value:12 },
  ],
  weeklyTrend: [
    { day:'Mon', patients:42 }, { day:'Tue', patients:38 },
    { day:'Wed', patients:55 }, { day:'Thu', patients:47 },
    { day:'Fri', patients:60 }, { day:'Sat', patients:35 }, { day:'Sun', patients:28 },
  ],
};