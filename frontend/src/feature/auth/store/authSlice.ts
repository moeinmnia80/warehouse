import type { AuthState, User } from "@/feature/auth/index";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};
const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logoutAction: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export default authSlice.reducer;
export const { setCredentials, logoutAction } = authSlice.actions;
