import { configureStore } from '@reduxjs/toolkit';
import bookedDayReducer, { BookedDayState } from '../reducers/bookedDayReducer';

const stringMiddleware = () => (next) => (action) => {
  if (typeof action === 'string') {
    return next({
      type: action
    })
  }
  return next(action)
};

export interface RootState {
  bookedDayReducer: BookedDayState;
}

const store = configureStore({
  reducer: { bookedDayReducer },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware),
});



export default store;