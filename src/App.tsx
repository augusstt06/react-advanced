import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from '@/pages/home/Home.tsx';
import Rendering from '@/pages/rendering/Rendering.tsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/rendering' element={<Rendering />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
