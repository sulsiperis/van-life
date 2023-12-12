
import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Vans from './pages/Vans';

import "./server"

/**
 * Challenge:
 * Bootstrap the VanLife project by creating the first 2 routes:
 * Home and About.
 * 
 * Also include the navbar that can link between the two routes.
 * For now, you'll either need to copy/paste the navbar code
 * to both Home and About pages, or you'll need to find a place
 * to put it where it can be shared between the two pages.
 * (Don't overthink this part - just do whatever is easiest for
 * you because we'll learn a better approach very soon)
 * 
 * Review challenge: do all the CSS yourself based on the design
 * linked in the slides.
 */



function App() {
  return (
    <div className='main'>
      <BrowserRouter>
        <nav>
          <Link className='logo' to={'/'}>#VANLIFE</Link> {/* Link is rendered into <a></a> tag */}
          <div className='menu'>
            <Link to={'/about'}>About</Link>
            <Link to={'/vans'}>Vans</Link>
          </div>
        </nav>
        <div className='content'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/vans' element={<Vans />} />
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
