import React from 'react';
import { Patient } from '../../types';
import Badge, { getStatusVariant } from '../../components/common/Badge';

const avatarColors = [
  'bg-blue-100 text-blue-700',
  'bg-purple-100 text-purple-700',
  'bg-rose-100 text-rose-700',
  'bg-amber-100 text-amber-700',
  'bg-emerald-100 text-emerald-700',
];

const PatientRow: React.FC<{ patient: Patient; index: number; onClick: () => void }> = ({ patient, index, onClick }) => (
  <tr
    onClick={onClick}
    className="hover:bg-blue-50 transition-colors border-b border-slate-100 cursor-pointer"
  >
    <td className="px-5 py-3">
      <div className="flex items-center gap-3">
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center font-semibold text-xs ${avatarColors[index % avatarColors.length]}`}>
          {patient.avatar}
        </div>
        <div>
          <p className="font-medium text-slate-800 text-sm">{patient.name}</p>
          <p className="text-xs text-slate-400">{patient.id}</p>
        </div>
      </div>
    </td>
    <td className="px-5 py-3 text-sm text-slate-600">{patient.age} • {patient.gender}</td>
    <td className="px-5 py-3 text-sm text-slate-600">{patient.condition}</td>
    <td className="px-5 py-3">
      <Badge label={patient.status} variant={getStatusVariant(patient.status)} />
    </td>
    <td className="px-5 py-3 text-sm text-slate-600">{patient.doctor}</td>
    <td className="px-5 py-3">
      <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-xs font-medium">{patient.bloodGroup}</span>
    </td>
    <td className="px-5 py-3 text-sm text-slate-500">{patient.admittedOn}</td>
    <td className="px-5 py-3 text-sm text-slate-500">{patient.phone}</td>
  </tr>
);

export default PatientRow;