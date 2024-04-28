// bookedDayReducer.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface BookedDayState {
  value: string[];
}

const initialState: BookedDayState = {
  value: []
};

const bookedDaySlice = createSlice({
  name: 'bookedDay',
  initialState,
  reducers: {
    setBookedDay: (state, action) => {
      state.value.includes(action.payload) ?
        state.value = state.value.filter(el => el !== action.payload) :
        state.value.push(action.payload)
    },
  },
});

const { actions, reducer } = bookedDaySlice;

export default reducer

export const {
  setBookedDay
} = actions
