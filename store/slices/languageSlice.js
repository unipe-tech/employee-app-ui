import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentLanguage: "en",
};

const languageSlice = createSlice({
  name: "language",
  initialState: initialState,
  reducers: {
    addCurrentLanguage(state, action) {
      state.currentLanguage = action.payload;
    },
  },
});

export const { addCurrentLanguage } = languageSlice.actions;
export default languageSlice.reducer;
