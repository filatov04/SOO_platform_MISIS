import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';

export interface HeadmanRecord {
  firstName: string;
  secondName: string;
  thirdName: string;
  tg: string;
  phone: string;
}

export interface HeadmanDictionary {
  [floor_id: string]: HeadmanRecord;
}

// interface HeadmanState {
//   data: HeadmanDictionary[];
// }

const initialState: HeadmanDictionary = {
  '0': { firstName: '', secondName: '', thirdName: '', tg: '', phone: '' }
};

export const HeadmansSlice = createSlice({
  name: 'headmans',
  initialState,
  reducers: {
    saveHeadmans: (state, action: PayloadAction<HeadmanDictionary>) => {
      Object.assign(state, action.payload);
    }
  }
});

export const { saveHeadmans } = HeadmansSlice.actions;
export const headmansInfo = (state: RootState) => state.headmans;
export const HeadmansReducer = HeadmansSlice.reducer;
