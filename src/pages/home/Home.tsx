import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <main>
      <h2>Category List</h2>
      <button>
        <Link to={'/rendering'}>Rendering</Link>
      </button>
    </main>
  );
}
