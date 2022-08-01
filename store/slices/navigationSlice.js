import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentScreen: "Welcome",
  drawerOpen: false,
};

const navigationSlice = createSlice({
  name: "navigation",
  initialState: initialState,
  reducers: {
    addCurrentScreen(state, action) {
      state.currentScreen = action.payload;
    },
    toggleDrawer(state) {
      state.drawerOpen = !state.drawerOpen;
    },
    resetNavigation(state) {
      Object.assign(state, initialState);
    },
  },
});

export const { addCurrentScreen, resetNavigation } = navigationSlice.actions;
export default navigationSlice.reducer;
