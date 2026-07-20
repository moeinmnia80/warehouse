import { baseApi } from "@/shared/index";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/feature/auth/store/authSlice";
import suiteReducer from "@/feature/suite/store/suiteSlice";
import shippingReducer from "@/feature/shipping/store/shippingSlice";
import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux";

// main store
export const store = configureStore({
  reducer: {
    suite: suiteReducer,
    shipping: shippingReducer,
    auth: authReducer,

    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

// type
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// custom hook
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
