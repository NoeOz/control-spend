import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInformation: {},
  spends: [],
  editSpend: {},
  thisMonth: 0,
  selectedMonth: 0,
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
    setThisMonth: (state, action) => {
      state.thisMonth = action.payload;
    },
    setSelectedMonth: (state, action) => {
      state.selectedMonth = action.payload;
    },
  },
});

export const {
  setUser,
  dropUser,
  setSpends,
  setEditSpend,
  setThisMonth,
  setSelectedMonth,
} = globalState.actions;

export default globalState.reducer;
