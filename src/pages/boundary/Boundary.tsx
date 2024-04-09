import { useState } from 'react';

import ErrorBoundary from '@/pages/boundary/childs/fallback/ErrorBoundary.tsx';
import Fallback from '@/pages/boundary/childs/fallback/Fallback.tsx';

export default function Boundary() {
  return (
    <ErrorBoundary fallback={<Fallback />}>
      <Child />
    </ErrorBoundary>
  );
}

function Child() {
  const [isError, setIsError] = useState<boolean>(false);

  if (isError) throw Error('Error occurred');
  return (
    <section>
      <h2>Error Boundary</h2>
      <button onClick={() => setIsError(!isError)}>Change Error State</button>
    </section>
  );
}
