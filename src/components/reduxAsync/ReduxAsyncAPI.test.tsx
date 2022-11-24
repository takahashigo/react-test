import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import customCounterReducer from '../../features/customCounter/customCounterSlice';

import ReduxAsync from './ReduxAsync';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';

const server = setupServer(
  rest.get('https://jsonplaceholder.typicode.com/users/1', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ username: 'Bred dummy' }));
  })
);
// このファイルのテスト実行前に一回だけ
beforeAll(() => server.listen());
// テストケースが終わるたびに実行
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
// このファイルのテスト実行後に一回だけ
afterAll(() => server.close());

describe('Redux Async API Mocking', () => {
  let store: ToolkitStore;
  beforeEach(() => {
    store = configureStore({
      reducer: {
        customCounter: customCounterReducer,
      },
    });
  });
  it('[Fetch sucess] Should display username in h3 tag', async () => {
    render(
      <Provider store={store}>
        <ReduxAsync />
      </Provider>
    );
    expect(screen.queryByRole('heading')).toBeNull();
    await userEvent.click(screen.getByText('FetchJSON'));
    expect(await screen.findByText('Bred dummy')).toBeInTheDocument();
  });
  it('[Fetch failed] Should display anonymous in h3 tag', async () => {
    server.use(
      rest.get(
        'https://jsonplaceholder.typicode.com/users/1',
        (req, res, ctx) => {
          return res(ctx.status(404));
        }
      )
    );
    render(
      <Provider store={store}>
        <ReduxAsync />
      </Provider>
    );
    expect(screen.queryByRole('heading')).toBeNull();
    await userEvent.click(screen.getByText('FetchJSON'));
    expect(await screen.findByText('anonymous')).toBeInTheDocument();
  });
});
