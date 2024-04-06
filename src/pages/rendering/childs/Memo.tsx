import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Memo() {
  const [immutable, setImmutable] = useState<number>(0);
  const [count, setCount] = useState<number>(0);

  const increment = () => {
    console.log('increment');
    setCount(count + 1);
  };
  const changeImmutable = () => {
    console.log('changeImmutable');
    setImmutable(immutable + 1);
  };
  // const calculate = () => {
  //   console.log('do calculating...');
  //   return (immutable + 2 * 2 * 1000 * 27) / 28;
  // };

  // 불필요한 연산을 useMemo로 최적화
  const calculate = useMemo(() => {
    console.log('do calculating using useMemo...');
    return (immutable + 2 * 2 * 1000 * 27) / 28;
  }, [immutable]);
  return (
    <section>
      <button>
        <Link to={'/rendering'}>Go to Rendering page</Link>
      </button>
      <h2>Count: {count}</h2>
      <div style={{ display: 'flex', gap: '20px' }}>
        <button onClick={increment}>Increment</button>
        <button onClick={changeImmutable}>Change Immutable</button>
      </div>

      <p>Calculate value : {calculate}</p>
    </section>
  );
}
