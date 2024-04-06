import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from '@/pages/home/Home.tsx';
import Callback from '@/pages/rendering/childs/Callback.tsx';
import ComponentMemo from '@/pages/rendering/childs/ComponentMemo.tsx';
import Memo from '@/pages/rendering/childs/Memo.tsx';
import Rendering from '@/pages/rendering/Rendering.tsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/rendering' element={<Rendering />} />
        <Route path='/rendering/memo' element={<Memo />} />
        <Route path='/rendering/callback' element={<Callback />} />
        <Route path='/rendering/component' element={<ComponentMemo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
