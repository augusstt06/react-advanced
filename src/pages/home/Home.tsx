import { Link } from 'react-router-dom';

export default function Home() {
  const linkList = [
    { title: 'Rendering', link: '/rendering' },
    { title: 'Context', link: '/context' },
    { title: 'Error Boundary', link: '/boundary' },
    { title: 'Ref', link: '/ref' },
    { title: 'Portal', link: '/portal' },
    { title: 'Optimization', link: '/optimization' },
  ];
  return (
    <main>
      <h2>Category List</h2>
      <section style={{ display: 'flex', gap: '10px' }}>
        {linkList.map((data) => (
          <button key={data.title}>
            <Link to={data.link}>{data.title}</Link>
          </button>
        ))}
      </section>
    </main>
  );
}
