import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentScreen: "",
};

const navigationSlice = createSlice({
  name: "navigation",
  initialState: initialState,
  reducers: {
    addCurrentScreen(state, action) {
      state.alternatePhone = action.payload;
    },
  },
});

export const { addCurrentScreen } = navigationSlice.actions;

export default navigationSlice.reducer;
