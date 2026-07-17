import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/feature/auth/store/authSlice";
import suiteReducer from "@/feature/suite/store/suiteSlice";
import shippingReducer from "@/feature/shipping/store/shippingSlice";
import { baseApi } from "@/shared/index";
import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux";

export const store = configureStore({
  reducer: {
    suite: suiteReducer,
    shipping: shippingReducer,
    auth: authReducer,

    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: [
          /^baseAPI\.queries\.(getPackageImage|getPackageInvoice)\(.*\)\.data$/,
          /^baseAPI\.queries\..*\.meta\.baseQueryMeta\.(request|response)$/,
        ],
        ignoredActions: ["baseAPI/executeQuery/fulfilled"],
      },
    }).concat(baseApi.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
