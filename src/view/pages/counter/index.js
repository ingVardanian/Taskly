import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment } from '../../../state-managment/reducers/issuesSlice';

const Counter = () => {
  const dispatch = useDispatch();
  const count = useSelector((state) => state);

  return (
    <div>
      <button onClick={() => dispatch(decrement())}>-</button>
      <span>count: {count.issues.count}</span>
      <button onClick={() => dispatch(increment())}>+</button>
    </div>
  )
};

export default Counter;