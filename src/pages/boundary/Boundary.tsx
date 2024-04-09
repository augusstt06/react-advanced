import Child from '@/pages/boundary/childs/Child.tsx';
import ErrorBoundary from '@/pages/boundary/childs/ErrorBoundary.tsx';
import Fallback from '@/pages/boundary/childs/Fallback.tsx';

export default function Boundary() {
  return (
    <ErrorBoundary fallback={<Fallback />}>
      <Child />
    </ErrorBoundary>
  );
}
