import { useCounter } from './useCounter';
import { act, renderHook } from '@testing-library/react';

describe('useCounter custom Hook', () => {
  it('Should increment by 1', () => {
    // renderHookで引数にカスタムhookを実行するcallback関数を入れる
    const { result } = renderHook(() => useCounter(3));
    // result.current.でアクセス
    expect(result.current.count).toBe(3);
    // カスタムhook内の関数を実行する（stateの更新など）には、act関数内で実行させる必要がある
    act(() => {
      result.current.increment();
    });
    // act実行後は、stateが更新されている
    expect(result.current.count).toBe(4);
  });
  it('Should decrement by 1', () => {
    const { result } = renderHook(() => useCounter(3));
    expect(result.current.count).toBe(3);
    act(() => {
      result.current.decrement();
    });
    expect(result.current.count).toBe(2);
  });
  it('Should double the counter value', () => {
    const { result } = renderHook(() => useCounter(3));
    expect(result.current.count).toBe(3);
    act(() => {
      result.current.double();
    });
    expect(result.current.count).toBe(6);
  });
  it('Should triple the counter value', () => {
    const { result } = renderHook(() => useCounter(3));
    expect(result.current.count).toBe(3);
    act(() => {
      result.current.triple();
    });
    expect(result.current.count).toBe(9);
  });
  it('Should reset to zero', () => {
    const { result } = renderHook(() => useCounter(3));
    expect(result.current.count).toBe(3);
    act(() => {
      result.current.reset();
    });
    expect(result.current.count).toBe(0);
  });
});
