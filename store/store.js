import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import aadhaarSlice from "./slices/aadhaarSlice";
import panSlice from "./slices/panSlice";
import bankSlice from "./slices/bankSlice";
import esicSlice from "./slices/esicSlice";
import profileSlice from "./slices/profileSlice";
import navigationSlice from "./slices/navigationSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    aadhaar: aadhaarSlice,
    pan: panSlice,
    bank: bankSlice,
    profile: profileSlice,
    esic: esicSlice,
    navigation: navigationSlice
  },
});
