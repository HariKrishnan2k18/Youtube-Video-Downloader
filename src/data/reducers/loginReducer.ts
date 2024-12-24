/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginPayload } from "../../Interface";

const initialState = {
  loading: false,
  token: null,
  user: {},
  error: ""
};

const loginSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setLoading: (state, _action: PayloadAction<LoginPayload>) => {
      state.loading = true;
    },
    setToken: (state, action) => {
      state.loading = false;
      state.token = action.payload?.token;
      state.user = action.payload?.user;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    }
  }
});

export const { setLoading, setToken, setError } = loginSlice.actions;
export default loginSlice.reducer;
