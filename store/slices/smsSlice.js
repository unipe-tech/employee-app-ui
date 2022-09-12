import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lastSmsIndex: 0,
};

const smsSlice = createSlice({
  name: "sms",
  initialState: initialState,
  reducers: {
    addLastSmsIndex(state, action) {
      state.lastSmsIndex = action.payload;
    },
  },
});

export const { addLastSmsIndex } = smsSlice.actions;
export default smsSlice.reducer;
