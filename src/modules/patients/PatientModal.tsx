import React from 'react';
import { Patient } from '../../types';
import Badge, { getStatusVariant } from '../../components/common/Badge';
import { X, Phone, Mail, Droplet, User, Calendar, Stethoscope, Heart } from 'lucide-react';

interface Props {
  patient: Patient | null;
  onClose: () => void;
}

const avatarColors = [
  'bg-blue-100 text-blue-700',
  'bg-purple-100 text-purple-700',
  'bg-rose-100 text-rose-700',
  'bg-amber-100 text-amber-700',
  'bg-emerald-100 text-emerald-700',
];

const InfoRow: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({ icon, label, value }) => (
  <div className="flex items-center gap-3 py-2.5 border-b border-slate-100 last:border-0">
    <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 shrink-0">{icon}</div>
    <div>
      <p className="text-xs text-slate-400">{label}</p>
      <p className="text-sm font-medium text-slate-700">{value}</p>
    </div>
  </div>
);

const PatientModal: React.FC<Props> = ({ patient, onClose }) => {
  if (!patient) return null;

  const idx = parseInt(patient.id.replace('P', '')) - 1;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-fade-in">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold ${avatarColors[idx % avatarColors.length]}`}>
              {patient.avatar}
            </div>
            <div>
              <h2 className="text-xl font-bold">{patient.name}</h2>
              <p className="text-blue-200 text-sm">{patient.id} • {patient.age} years • {patient.gender}</p>
              <div className="mt-2">
                <Badge label={patient.status} variant={getStatusVariant(patient.status)} />
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-x-6">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Personal Info</p>
            <InfoRow icon={<User className="w-4 h-4" />} label="Full Name" value={patient.name} />
            <InfoRow icon={<Phone className="w-4 h-4" />} label="Phone" value={patient.phone} />
            <InfoRow icon={<Mail className="w-4 h-4" />} label="Email" value={patient.email} />
            <InfoRow icon={<Heart className="w-4 h-4" />} label="Blood Group" value={patient.bloodGroup} />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Medical Info</p>
            <InfoRow icon={<Droplet className="w-4 h-4" />} label="Condition" value={patient.condition} />
            <InfoRow icon={<Stethoscope className="w-4 h-4" />} label="Doctor" value={patient.doctor} />
            <InfoRow icon={<Calendar className="w-4 h-4" />} label="Admitted On" value={patient.admittedOn} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientModal;