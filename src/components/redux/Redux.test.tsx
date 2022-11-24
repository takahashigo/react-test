// integrationTest

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import Redux from './Redux';
import { configureStore } from '@reduxjs/toolkit';
import customCounterReducer from '../../features/customCounter/customCounterSlice';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';

describe('Redux Integration Test', () => {
  let store: ToolkitStore;
  // 各テストケースが走る前にstoreを更新(作り直す）する(初期状態に戻す)、Reactアプリケーションで使っているstoreはテストで変更が生じてはいけないので、別途作成
  beforeEach(() => {
    store = configureStore({
      reducer: {
        customCounter: customCounterReducer,
      },
    });
  });
  it('Should display value with increment by 1 per click', async () => {
    render(
      <Provider store={store}>
        <Redux />
      </Provider>
    );
    await userEvent.click(screen.getByText('+'));
    await userEvent.click(screen.getByText('+'));
    await userEvent.click(screen.getByText('+'));
    expect(screen.getByTestId('count-value')).toHaveTextContent('3');
  });
  it('Should display value with decrement by 1 per click', async () => {
    render(
      <Provider store={store}>
        <Redux />
      </Provider>
    );
    // getByTextはテキストから特定の要素を取得できる
    await userEvent.click(screen.getByText('-'));
    await userEvent.click(screen.getByText('-'));
    expect(screen.getByTestId('count-value')).toHaveTextContent('-2');
  });
  it('Should display value vwith incrementByAmount', async () => {
    render(
      <Provider store={store}>
        <Redux />
      </Provider>
    );
    await userEvent.type(screen.getByPlaceholderText('Enter'), '30');
    await userEvent.click(screen.getByText('IncrementByAmount'));
    expect(screen.getByTestId('count-value')).toHaveTextContent('30');
  });
});
