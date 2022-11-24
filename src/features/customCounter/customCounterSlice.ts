import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import axios from 'axios';
import { User } from '../../types';

export interface CounterState {
  value: number;
  mode: number;
  userName: string;
}

const initialState: CounterState = {
  value: 0,
  mode: 0,
  userName: '',
};

const sleep = (msec: number): void => {
  const start = new Date();
  while (new Date().getTime() - start.getTime() < msec);
};

export const fetchDummy = createAsyncThunk(
  '"fetch/dummy"',
  async (num: number) => {
    await sleep(2000);
    return num;
  }
);

export const fetchJSON = createAsyncThunk('fetch/api', async () => {
  const res = await axios.get<User>(
    'https://jsonplaceholder.typicode.com/users/1'
  );
  const { username } = res.data;
  return username;
});

export const customCounterSlice = createSlice({
  name: 'customCounter',
  initialState,
  reducers: {
    increment: (state) => {
      switch (state.mode) {
        case 0:
          state.value += 1;
          break;
        case 1:
          state.value += 100;
          break;
        case 2:
          state.value += 10000;
          break;
        default:
          break;
      }
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      switch (state.mode) {
        case 0:
          state.value += action.payload;
          break;
        case 1:
          state.value += 100 * action.payload;
          break;
        case 2:
          state.value += 10000 * action.payload;
          break;
        default:
          break;
      }
    },
  },

  extraReducers: (builder) => {
    builder
      // .addCase(fetchDummy.pending, (state) => {
      //   state.status = 'loading';
      // })
      // actionのpayload属性にはfetchDummyでreturnした値が入ってくる
      .addCase(fetchDummy.fulfilled, (state, action) => {
        state.value = 100 + action.payload;
      })
      .addCase(fetchDummy.rejected, (state) => {
        state.value = 100;
      })
      .addCase(fetchJSON.fulfilled, (state, action) => {
        state.userName = action.payload;
      })
      .addCase(fetchJSON.rejected, (state) => {
        state.userName = 'anonymous';
      });
  },
});

export const { increment, decrement, incrementByAmount } =
  customCounterSlice.actions;

export const selectCount = (state: RootState) => state.customCounter.value;
export const selectUserName = (state: RootState) =>
  state.customCounter.userName;

export default customCounterSlice.reducer;
