import { useState } from 'react';

export default function Child() {
  const [isError, setIsError] = useState<boolean>(false);

  if (isError) throw Error('Error occurred');
  return (
    <section>
      <h2>Error Boundary</h2>
      <button onClick={() => setIsError(!isError)}>Change Error State</button>
    </section>
  );
}
