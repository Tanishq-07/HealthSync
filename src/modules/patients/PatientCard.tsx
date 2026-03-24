import React from 'react';
import { Patient } from '../../types';
import { Phone, Mail, Droplet } from 'lucide-react';
import Card from '../../components/common/Card';
import Badge, { getStatusVariant } from '../../components/common/Badge';

const avatarColors = [
  'bg-blue-100 text-blue-700',
  'bg-purple-100 text-purple-700',
  'bg-rose-100 text-rose-700',
  'bg-amber-100 text-amber-700',
  'bg-emerald-100 text-emerald-700',
];

const PatientCard: React.FC<{ patient: Patient; index: number; onClick: () => void }> = ({ patient, index, onClick }) => (
  <Card hoverable onClick={onClick}>
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center gap-3">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm ${avatarColors[index % avatarColors.length]}`}>
          {patient.avatar}
        </div>
        <div>
          <p className="font-semibold text-slate-800">{patient.name}</p>
          <p className="text-xs text-slate-400">{patient.id} • {patient.age}y • {patient.gender}</p>
        </div>
      </div>
      <Badge label={patient.status} variant={getStatusVariant(patient.status)} />
    </div>

    <div className="space-y-2 text-sm">
      <div className="flex items-center gap-2 text-slate-600">
        <Droplet className="w-3.5 h-3.5 text-red-400" />
        <span>{patient.condition}</span>
      </div>
      <div className="flex items-center gap-2 text-slate-500 text-xs">
        <Phone className="w-3.5 h-3.5" /><span>{patient.phone}</span>
      </div>
      <div className="flex items-center gap-2 text-slate-500 text-xs">
        <Mail className="w-3.5 h-3.5" /><span>{patient.email}</span>
      </div>
    </div>

    <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
      <span>{patient.doctor}</span>
      <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">{patient.bloodGroup}</span>
    </div>
  </Card>
);

export default PatientCard;