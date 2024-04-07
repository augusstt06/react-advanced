import { ExampleContext } from '@/pages/context/Context.tsx';

export default function Colorbox() {
  return (
    <ExampleContext.Consumer>
      {(value) => <div style={{ width: '60px', height: '60px', background: value.color }}></div>}
    </ExampleContext.Consumer>
  );
}
