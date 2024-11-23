import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';

export interface HeadmanState {
  firstName: string;
  secondName: string;
  thirdName: string;
  tg: string;
  phone: string;
}

interface HeadmansState {
  headmansArray: HeadmanState[];
}

const initialState: HeadmansState = {
  headmansArray: [{ firstName: '', secondName: '', thirdName: '', tg: '', phone: '' }]
};

export const HeadmansSlice = createSlice({
  name: 'headmans',
  initialState,
  reducers: {
    saveHeadmans: (state, action: PayloadAction<HeadmanState[]>) => {
      state.headmansArray = action.payload;
    }
  }
});

export const { saveHeadmans } = HeadmansSlice.actions;
export const headmansInfo = (state: RootState) => state.headmans;
export const HeadmansReducer = HeadmansSlice.reducer;
