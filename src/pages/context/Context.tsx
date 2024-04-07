import { createContext } from 'react';

import { ThemeProvider } from '@/context/theme.tsx';
import Colorbox from '@/pages/context/childs/Colorbox.tsx';
import Theme from '@/pages/context/childs/Theme.tsx';

export const ExampleContext = createContext({ color: 'black' });
export function Context() {
  return (
    <section>
      <h2>React Context</h2>
      <Colorbox />
      <ThemeProvider>
        <Theme />
      </ThemeProvider>
    </section>
  );
}
