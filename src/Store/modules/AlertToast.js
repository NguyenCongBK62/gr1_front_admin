import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  toastStatus: null,
};

const AlertToastSlice = createSlice({
  name: 'AlertToast',
  initialState,
  reducers: {
    setToastStatus: (state, action) => {
      if (action.payload !== 0) state.toastStatus = state.toastStatus + 1;
      else state.toastStatus = action.payload;
    },
  },
});

export const { setToastStatus } = AlertToastSlice.actions;

export default AlertToastSlice.reducer;
