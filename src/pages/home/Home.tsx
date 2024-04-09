import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <main>
      <h2>Category List</h2>
      <section style={{ display: 'flex', gap: '10px' }}>
        <button>
          <Link to={'/rendering'}>Rendering</Link>
        </button>
        <button>
          <Link to={'/context'}>Context</Link>
        </button>
        <button>
          <Link to={'/boundary'}>Error Boundary</Link>
        </button>
      </section>
    </main>
  );
}
