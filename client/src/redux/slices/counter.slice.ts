import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CounterSlice {
  value: number;
}

const initialState: CounterSlice = {
  value: 5,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    incr: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrByAmount: (state, { payload }: PayloadAction<number>) => {
      state.value += payload;
    },
  },
});

export const { incrByAmount, decrement, incr } = counterSlice.actions;
export default counterSlice.reducer;
