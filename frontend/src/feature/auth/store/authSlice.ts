import type { User } from "@/shared";
import type { AuthState } from "@/feature/auth/index";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: AuthState = {
  user: null,
  email: null,
  status: "loading",
};
const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.status = "authenticated";
    },
    logoutAction: (state) => {
      state.user = null;
      state.status = "unauthenticated";
    },
    setEmail: (state, action: PayloadAction<{ email: string }>) => {
      state.email = action.payload.email;
    },
  },
});

export default authSlice.reducer;
export const { setCredentials, logoutAction, setEmail } = authSlice.actions;
