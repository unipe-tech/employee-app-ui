import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lastScreen: null,
};

const onboardingSlice = createSlice({
  name: "onboarding",
  initialState: initialState,
  reducers: {
    updateLastScreen(state, action) {
      state.lastScreen = action.payload;
    },
  },
});

export const { updateLastScreen } = onboardingSlice.actions;
export default onboardingSlice.reducer;
