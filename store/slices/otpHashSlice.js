import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  otpHash: "",
};

const otpHashSlice = createSlice({
  name: "otpHash",
  initialState: initialState,
  reducers: {
    addOtpHash(state, action) {
      state.otpHash = action.payload;
    },
    resetOtpHash(state) {
      Object.assign(state, initialState);
    },
  },
});

export const { addOtpHash, resetOtpHash } = otpHashSlice.actions;
export default otpHashSlice.reducer;
