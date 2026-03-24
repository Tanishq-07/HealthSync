import React from 'react';
import { LayoutGrid, List } from 'lucide-react';
import { ViewMode } from '../../types';

interface ViewToggleProps {
  viewMode: ViewMode;
  onChange: (mode: ViewMode) => void;
}

const ViewToggle: React.FC<ViewToggleProps> = ({ viewMode, onChange }) => (
  <div className="flex items-center bg-white border border-slate-200 rounded-lg p-1 gap-1">
    <button
      onClick={() => onChange('grid')}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-150 ${viewMode === 'grid' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
    >
      <LayoutGrid className="w-4 h-4" /><span>Grid</span>
    </button>
    <button
      onClick={() => onChange('list')}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-150 ${viewMode === 'list' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
    >
      <List className="w-4 h-4" /><span>List</span>
    </button>
  </div>
);

export default ViewToggle;