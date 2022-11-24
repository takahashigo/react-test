import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectCount,
  selectUserName,
  fetchDummy,
  fetchJSON,
} from '../../features/customCounter/customCounterSlice';

const ReduxAsync = () => {
  const count = useAppSelector(selectCount);
  const userName = useAppSelector(selectUserName);
  const dispatch = useAppDispatch();
  return (
    <div>
      <span data-testid="count-value">{count}</span>
      <button onClick={() => dispatch(fetchDummy(5))}>FetchDummy</button>
      {userName && <h1>{userName}</h1>}
      <button onClick={() => dispatch(fetchJSON())}>FetchJSON</button>
    </div>
  );
};

export default ReduxAsync;
