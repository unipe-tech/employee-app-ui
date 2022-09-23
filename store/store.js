import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from "redux-persist";

import aadhaarSlice from "./slices/aadhaarSlice";
import authSlice from "./slices/authSlice";
import bankSlice from "./slices/bankSlice";
import esicSlice from "./slices/esicSlice";
import navigationSlice from "./slices/navigationSlice";
import panSlice from "./slices/panSlice";
import profileSlice from "./slices/profileSlice";
import licenseSlice from "./slices/licenseSlice";
import timerSlice from "./slices/timerSlice";

import ewaConfigSlice from "./slices/ewa/ewaConfigSlice";
import ewaLandingSlice from "./slices/ewa/ewaLandingSlice";
import ewaMandateSlice from "./slices/ewa/ewaMandateSlice";
import ewaAgreementSlice from "./slices/ewa/ewaAgreementSlice";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  aadhaar: aadhaarSlice,
  auth: authSlice,
  bank: bankSlice,
  esic: esicSlice,
  navigation: navigationSlice,
  pan: panSlice,
  profile: profileSlice,
  license: licenseSlice,
  timer: timerSlice,
  ewaConfig: ewaConfigSlice,
  ewaLanding: ewaLandingSlice,
  ewaMandate: ewaMandateSlice,
  ewaAgreement: ewaAgreementSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
