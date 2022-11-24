import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import customCounterReducer from '../features/customCounter/customCounterSlice';

export const store = configureStore({
  reducer: {
    customCounter: customCounterReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
