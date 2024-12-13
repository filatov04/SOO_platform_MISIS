import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';

interface ChooseFooterState {
  option: number;
}

const initialState: ChooseFooterState = {
  option: 1
};

export const FooterSlice = createSlice({
  name: 'footer',
  initialState,
  reducers: {
    setOption: (state, action: PayloadAction<ChooseFooterState>) => {
      state.option = action.payload.option;
    }
  }
});

export const { setOption } = FooterSlice.actions;
export const footerOptions = (state: RootState) => state.root.footer.option;
export const footerReducer = FooterSlice.reducer;
