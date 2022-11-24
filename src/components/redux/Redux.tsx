import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectCount,
  increment,
  decrement,
  incrementByAmount,
} from '../../features/customCounter/customCounterSlice';

const Redux = () => {
  const [number, setNumber] = React.useState<string | number>(0);
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();

  return (
    <div>
      <h3>Redux Integration Test</h3>
      <div>
        <button onClick={() => dispatch(increment())}>+</button>
        <span data-testid="count-value">{count}</span>
        <button onClick={() => dispatch(decrement())}>-</button>
        <button
          onClick={() =>
            dispatch(incrementByAmount(Number(number) ? Number(number) : 0))
          }
        >
          IncrementByAmount
        </button>
        <input
          type="text"
          placeholder="Enter"
          value={number}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNumber(e.target.value)
          }
        />
      </div>
    </div>
  );
};

export default Redux;
