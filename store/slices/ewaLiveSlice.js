import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  offerId: "",
  dueDate: "",
  eligibleAmount: 1000,
  fees: 5,
  loanAmount: "",
  stage: "",
};

const ewaLiveSlice = createSlice({
  name: "ewaLive",
  initialState: initialState,
  reducers: {
    addOfferId(state, action) {
      state.offerId = action.payload;
    },
    addDueDate(state, action) {
      state.dueDate = action.payload;
    },
    addEligibleAmount(state, action) {
      state.eligibleAmount = action.payload;
    },
    addFees(state, action) {
      state.fees = action.payload;
    },
    addLoanAmount(state, action) {
      state.loanAmount = action.payload;
    },
    addStage(state, action) {
      state.stage = action.payload;
    },
    resetEwaLive(state, action) {
      if (!action.payload) {
        Object.assign(state, initialState);
      } else {
        Object.assign(state, action.payload);
      }
    },
  },
});

export const {
  addOfferId,
  addDueDate,
  addEligibleAmount,
  addFees,
  addLoanAmount,
  addStage,
  addStatus,
  resetEwaLive,
} = ewaLiveSlice.actions;

export default ewaLiveSlice.reducer;