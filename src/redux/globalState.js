import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInformation: {},
  spends: [],
  editSpend: {},
};

const globalState = createSlice({
  name: "globalState",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userInformation = action.payload;
    },
    dropUser: (state) => {
      state.userInformation = {};
    },
    setSpends: (state, action) => {
      state.spends = action.payload;
    },
    setEditSpend: (state, action) => {
      state.editSpend = action.payload;
    },
  },
});

export const { setUser, dropUser, setSpends, setEditSpend } =
  globalState.actions;

export default globalState.reducer;
