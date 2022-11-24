import React from 'react';
import { render, screen } from '@testing-library/react';
import UseEffectRender from './UseEffectRender';

describe('useEffect rendering', () => {
  it('Should render only after async function resolved', async () => {
    render(<UseEffectRender />);
    // 非同期関数が実行される前を検証（最初にレンダリングされたときは文字は表示されていない）
    expect(screen.queryByText(/I am/)).toBeNull();
    // findByTextで非同期の結果が反映されるまで待ってくれる、testing-libraryのタイムアウトが4秒で、先に4秒たったらタイムアウトのエラーが出る
    expect(await screen.findByText(/I am/)).toBeInTheDocument();
  });
});
