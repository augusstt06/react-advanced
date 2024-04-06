import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';

const set = new Set();
export default function Callback() {
  const [count, setCount] = useState<number>(0);
  const increment = () => setCount((prev) => prev + 1);
  const log = useCallback(() => console.log('re'), []);
  set.add(log);
  console.log(set);

  return (
    <section>
      <button>
        <Link to={'/rendering'}>Go to Rendering page</Link>
      </button>
      <p>count : {count}</p>
      <button onClick={increment}>Increment</button>
    </section>
  );
}

// function ChildComponent({ onClick }: { onClick: () => void }) {
//   console.log('child component is rendering!');
//   return <button onClick={onClick}>Child component</button>;
// }
