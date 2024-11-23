import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';

export interface UserState {
  firstName: string;
  secondName: string;
  thirdName: string;
  role: string;
  dormId: number;
}

const initialState: UserState = {
  firstName: '',
  secondName: '',
  thirdName: '',
  role: '',
  dormId: 0
};

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveInfo: (state, action: PayloadAction<UserState>) => {
      state.firstName = action.payload.firstName;
      state.secondName = action.payload.secondName;
      state.thirdName = action.payload.thirdName;
      state.role = action.payload.role;
      state.dormId = action.payload.dormId;
    }
  }
});

export const { saveInfo } = UserSlice.actions;
export const userInfo = (state: RootState) => state.user;
export const userReducer = UserSlice.reducer;
