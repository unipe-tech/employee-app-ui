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
    }
  },
});

export const { addCurrentScreen,toggleDrawer} = navigationSlice.actions;
export default navigationSlice.reducer;
