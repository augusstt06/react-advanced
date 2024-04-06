import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';

export default function ComponentMemo() {
  const [count, setCount] = useState<number>(0);
  const increment = () => setCount((prev) => prev + 1);
  const propsFn = useCallback(() => {}, []);
  return (
    <section>
      <button>
        <Link to={'/rendering'}>Go to Rendering page</Link>
      </button>
      <p>count : {count}</p>
      <button onClick={increment}>Increment</button>
      <ChildComponent onClick={propsFn} />
    </section>
  );
}

const ChildComponent = React.memo(({ onClick }: { onClick: () => void }) => {
  console.log('child component is rendering!');
  return <button onClick={onClick}>Child component</button>;
});
