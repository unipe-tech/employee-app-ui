import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  aCTC: "",
  employeeName: "",
  onboarded: false,
  phoneNumber: "",
  token: "",
  unipeEmployeeId: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    addACTC(state, action) {
      state.aCTC = action.payload;
    },
    addEmployeeName(state, action) {
      state.employeeName = action.payload;
    },
    addOnboarded(state, action) {
      state.onboarded = action.payload;
    },
    addPhoneNumber(state, action) {
      state.phoneNumber = action.payload;
    },
    addToken(state, action) {
      state.token = action.payload;
    },
    addUnipeEmployeeId(state, action) {
      state.unipeEmployeeId = action.payload;
    },
    resetAuth(state) {
      Object.assign(state, initialState);
    },
  },
});

export const {
  addACTC,
  addEmployeeName,
  addOnboarded,
  addPhoneNumber,
  addToken,
  addUnipeEmployeeId,
  resetAuth,
} = authSlice.actions;

export default authSlice.reducer;
