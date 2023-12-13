
import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Vans from './pages/Vans';
import VanDetail from './pages/VanDetail';
import Layout from './components/Layout';

import "./server"




function App() {
  return (
    <div className='main'>
      <BrowserRouter>        
        <div className='content'>          
          <Routes>
            <Route element={<Layout />}>
              <Route path='/' element={<Home />} />
              <Route path='/about' element={<About />} />
              <Route path='/vans' element={<Vans />} />
              <Route path='/vans/:id' element={<VanDetail />} /> {/* ":" means that it's a variable not a predefinet string */}
            </Route>
          </Routes>
        </div>
        <footer>
          <h4>Ⓒ 2022 #VANLIFE</h4>
        </footer>
      </BrowserRouter>
    </div>    
  );
}

export default App;
