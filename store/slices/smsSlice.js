import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lastReceivedDate: 0,
};

const smsSlice = createSlice({
  name: "sms",
  initialState: initialState,
  reducers: {
    addLastReceivedDate(state, action) {
      state.lastReceivedDate = action.payload;
    },
  },
});

export const { addLastReceivedDate } = smsSlice.actions;
export default smsSlice.reducer;
