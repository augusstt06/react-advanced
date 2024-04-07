import { useTheme } from '@/context/theme.tsx';

export default function Theme() {
  const { theme, setTheme } = useTheme();
  return (
    <div
      style={{
        background: theme === 'light' ? '#fff' : '#2e2e2e',
        color: theme === 'light' ? '#2e2e2e' : '#fff',
      }}
    >
      <h1>Themed Component</h1>
      <button onClick={setTheme}>
        Change to {theme === 'light' ? 'Dark Theme' : 'Light Theme'}
      </button>
    </div>
  );
}
