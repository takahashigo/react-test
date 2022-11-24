import React from 'react';
import { render, screen } from '@testing-library/react';
import Render from './Render';

// describeにタイトル,itの後にテストの内容
describe('Rendering', () => {
  it('Should render all the elements correctly', () => {
    //RenderコンポーネントのHTMLの構造を取得
    render(<Render />);
    // debugでターミナルに出力できる
    //screen.debug();
    //https://github.com/A11yance/aria-query#elements-to-roles
    //screen.debug(screen.getByRole("heading"));
    //https://jestjs.io/docs/en/expect
    // HTMLの各タグには役割があるh1~h6だったらheading,要素取得に使う
    //テストのscreen上（レンダリング後）にheadingがあるかどうか（存在するかどうか）、あったらtrueが返り、テストが通る
    expect(screen.getByRole('heading')).toBeTruthy();
    expect(screen.getByRole('textbox')).toBeTruthy();
    // 複数要素がある場合、screen.getAllByRole('button')の返り値は配列
    expect(screen.getAllByRole('button')[0]).toBeTruthy();
    expect(screen.getAllByRole('button')[1]).toBeTruthy();
    // 文字を含んだelementを取得
    expect(screen.getByText('Udemy')).toBeTruthy();
    // その後のテストも続ける必要がある場合
    expect(screen.queryByText('Udeeeemy')).toBeNull();
    // idを使って、要素を取得する場合
    expect(screen.getByTestId('copyright')).toBeTruthy();

    //screen.debug(screen.getByText("Udemy"));
  });
});
