import { configureStore } from "@reduxjs/toolkit";
import { createStore } from 'redux'
import { combineReducers } from "redux";
import { applyMiddleware } from "redux";
import thunk from "redux-thunk";
import authSlice from "./slices/authSlice";
import imageSlice from "./slices/imageSlice";
import aadhaarSlice from "./slices/aadhaarSlice";
import panSlice from "./slices/panSlice";
import bankSlice from "./slices/bankSlice";
import esicSlice from "./slices/esicSlice";
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';
import onboardingSlice from "./slices/onboardingSlice";

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}

// let rootReducer =  combineReducers({
//   auth: persistReducer(persistConfig, authSlice),
//   image: persistReducer(persistConfig, imageSlice),
//   aadhaar: persistReducer(persistConfig, aadhaarSlice),
//   pan: persistReducer(persistConfig, panSlice),
//   bank: persistReducer(persistConfig, bankSlice),
//   esic: persistReducer(persistConfig, esicSlice),
//   onboarding: persistReducer(persistConfig, onboardingSlice)
// })

let rootReducer =  combineReducers({
  auth: authSlice,
  image: imageSlice,
  aadhaar: aadhaarSlice,
  pan: panSlice,
  bank: bankSlice,
  esic: esicSlice,
  onboarding: onboardingSlice
})

const pReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(pReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);
