import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { rest } from 'msw';
import { setupServer } from 'msw/node';
import MockServer from './MockServer';

// カスタムの擬似的なAPIエンドポイントを作成（テストの際に、component内で外部のAPIにアクセスする際に下記の擬似的なエンドポイントにアクセスしてレスポンスを受け取れる）
const server = setupServer(
  rest.get('https://jsonplaceholder.typicode.com/users/1', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ username: 'Bred dummy' }));
  })
);

// このファイルで最初に一回だけ実行される
beforeAll(() => server.listen());

// 各テストケースが終わるたびに実行される
afterEach(() => {
  server.resetHandlers();
});

// このファイルで最後に一回だけ実行される
afterAll(() => server.close());

describe('Mocking API', () => {
  it('[Fetch success]Should display fetched data correctly and button disable', async () => {
    render(<MockServer />);
    await userEvent.click(screen.getByRole('button'));
    expect(await screen.findByRole('heading')).toHaveTextContent('Bred dummy');
    // toHaveAttributeは引数の属性があるかどうか検証
    expect(screen.getByRole('button')).toHaveAttribute('disabled');
  });
  it('[Fetch failure]Should display error msg, no render heading and button abled', async () => {
    // server.useでエラーなどを表現できる、これはこのitブロック内のみで有効
    server.use(
      rest.get(
        'https://jsonplaceholder.typicode.com/users/1',
        (req, res, ctx) => {
          return res(ctx.status(404));
        }
      )
    );
    render(<MockServer />);
    await userEvent.click(screen.getByRole('button'));
    expect(await screen.findByTestId('error')).toHaveTextContent(
      'Fetching Failed !'
    );
    expect(screen.queryByRole('heading')).toBeNull();
    expect(screen.getByRole('button')).not.toHaveAttribute('disabled');
  });
});
