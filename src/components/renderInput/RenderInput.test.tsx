import { render, screen } from '@testing-library/react';
//userがタイピングやボタンをクリックしたなどを表現する
import userEvent from '@testing-library/user-event';
import { ReactHTML } from 'react';
import { output } from '../../App';
import RenderInput from './RenderInput';

// afterEach(() => cleanup());のcleanup関数はテスト間の相互作用をなくす（一つのテストが終わった後に、テストでレンダリングした後、アンマウントしてくれる）

describe('Rendering', () => {
  it('Should render all the elements correctly', () => {
    const outputConsole = jest.fn();
    render(<RenderInput outputConsole={outputConsole} />);
    expect(screen.getByRole('button')).toBeTruthy();
    // placeholderで要素を特定できる
    expect(screen.getByPlaceholderText('Enter')).toBeTruthy();
  });
});

describe('Input form onChange event', () => {
  it('Should update input value correctly', async () => {
    //const user = userEvent.setup();
    const outputConsole = jest.fn();
    render(<RenderInput outputConsole={outputConsole} />);
    // element取得
    const inputValue: HTMLInputElement = screen.getByPlaceholderText('Enter');
    //await user.type(inputValue, "test");
    // userがタイピングしていることをシュミレート
    await userEvent.type(inputValue, 'test');
    expect(inputValue.value).toBe('test');
  });
});

describe('Console button conditionally triggered', () => {
  it('Should not trigger output function', async () => {
    // jestが用意してくれているダミーの関数（mock関数）,これをpropsとして利用する、関数が呼ばれたか呼ばれていないか判定するときに便利
    const outputConsole = jest.fn();
    render(<RenderInput outputConsole={outputConsole} />);
    await userEvent.click(screen.getByRole('button'));
    // propsで渡した関数（mock関数）が呼びされていないことを期待する
    expect(outputConsole).not.toHaveBeenCalled();
  });
  it('Should trigger output function', async () => {
    const outputConsole = jest.fn();
    render(<RenderInput outputConsole={outputConsole} />);
    const inputValue = screen.getByPlaceholderText('Enter');
    await userEvent.type(inputValue, 'test');
    await userEvent.click(screen.getByRole('button'));
    // mock関数が1回だけ呼び出されていることを期待する
    expect(outputConsole).toHaveBeenCalledTimes(1);
  });
});
