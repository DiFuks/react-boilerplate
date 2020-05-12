import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IRootState } from '@app/store';

export const { actions, reducer } = createSlice({
  name: 'loginForm',
  initialState: {
    text: '',
  },
  reducers: {
    changeText: (state, action: PayloadAction<string>) => {
      state.text = action.payload;
    },
  },
});

export const selectors = {
  textSelector: (state: IRootState) => state.loginForm.text,
};
