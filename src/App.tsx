import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Boundary from '@/pages/boundary/Boundary.tsx';
import { Context } from '@/pages/context/Context.tsx';
import Home from '@/pages/home/Home.tsx';
import Ref from '@/pages/ref/Ref.tsx';
import Callback from '@/pages/rendering/childs/Callback.tsx';
import ComponentMemo from '@/pages/rendering/childs/ComponentMemo.tsx';
import Memo from '@/pages/rendering/childs/Memo.tsx';
import Rendering from '@/pages/rendering/Rendering.tsx';
import Portal from '@/portal/Portal.tsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/rendering' element={<Rendering />} />
        <Route path='/rendering/memo' element={<Memo />} />
        <Route path='/rendering/callback' element={<Callback />} />
        <Route path='/rendering/component' element={<ComponentMemo />} />
        <Route path='/context' element={<Context />} />
        <Route path='/boundary' element={<Boundary />} />
        <Route path='/ref' element={<Ref />} />
        <Route path='/portal' element={<Portal />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
