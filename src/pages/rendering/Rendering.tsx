import { Link } from 'react-router-dom';

export default function Rendering() {
  return (
    <section>
      <h2>Rendering</h2>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button>
          <Link to={'/rendering/memo'}>useMemo</Link>
        </button>
        <button>
          <Link to={'/rendering/callback'}>useCallback</Link>
        </button>
        <button>
          <Link to={'/rendering/component'}>React.memo</Link>
        </button>
      </div>
    </section>
  );
}
