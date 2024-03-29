import reducer, {
  CounterState,
  fetchDummy,
} from '../../features/customCounter/customCounterSlice';

describe('extraReducers', () => {
  const initialState: CounterState = {
    mode: 0,
    value: 0,
    userName: '',
  };
  it('Should output 100 + payload when fullfiled', () => {
    const action = { type: fetchDummy.fulfilled.type, payload: 5 };
    const state = reducer(initialState, action);
    expect(state.value).toEqual(105);
  });
  it('Should output 100 - payload when rejected', () => {
    const action = { type: fetchDummy.rejected.type };
    const state = reducer(initialState, action);
    expect(state.value).toEqual(100);
  });
});
