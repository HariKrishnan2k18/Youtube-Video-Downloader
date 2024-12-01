import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null
};

const loginSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setToken: (state: any, action) => {
      state.token = action.payload?.token;
      state.user = action.payload?.user;
    }
  }
});

export const { setToken } = loginSlice.actions;
export default loginSlice.reducer;
