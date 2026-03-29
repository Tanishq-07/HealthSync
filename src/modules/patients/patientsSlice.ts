import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Patient, ViewMode } from '../../types';
import { mockPatients } from '../../utils/mockData';

interface PatientsState {
  list: Patient[];
  viewMode: ViewMode;
  search: string;
  filterStatus: string;
}

const patientsSlice = createSlice({
  name: 'patients',
  initialState: { list: mockPatients, viewMode: 'grid', search: '', filterStatus: 'All' } as PatientsState,
  reducers: {
    setViewMode(state, action: PayloadAction<ViewMode>) { state.viewMode = action.payload; },
    setSearch(state, action: PayloadAction<string>) { state.search = action.payload; },
    setFilterStatus(state, action: PayloadAction<string>) { state.filterStatus = action.payload; },
    updatePatientStatus(state, action: PayloadAction<{ id: string; status: Patient['status'] }>) {
      const patient = state.list.find(p => p.id === action.payload.id);
      if (patient) patient.status = action.payload.status;
    },
  },
});

export const { setViewMode, setSearch, setFilterStatus, updatePatientStatus } = patientsSlice.actions;
export default patientsSlice.reducer;