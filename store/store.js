import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer,persistStore } from "redux-persist";

import aadhaarSlice from "./slices/aadhaarSlice";
import authSlice from "./slices/authSlice";
import bankSlice from "./slices/bankSlice";
import esicSlice from "./slices/esicSlice";
import ewaHistoricalSlice from "./slices/ewaHistoricalSlice";
import ewaLiveSlice from "./slices/ewaLiveSlice";
import licenseSlice from "./slices/licenseSlice";
import mandateSlice from "./slices/mandateSlice";
import navigationSlice from "./slices/navigationSlice";
import panSlice from "./slices/panSlice";
import profileSlice from "./slices/profileSlice";
import timerSlice from "./slices/timerSlice";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  aadhaar: aadhaarSlice,
  auth: authSlice,
  bank: bankSlice,
  mandate: mandateSlice,
  esic: esicSlice,
  navigation: navigationSlice,
  pan: panSlice,
  profile: profileSlice,
  license: licenseSlice,
  timer: timerSlice,
  ewaLive: ewaLiveSlice,
  ewaHistorical: ewaHistoricalSlice,
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
