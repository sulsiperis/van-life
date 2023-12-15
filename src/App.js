import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Vans from './pages/vans/Vans';
import VanDetail from './pages/vans/VanDetail';
import Layout from './components/Layout';
import Reviews from './pages/host/Reviews';
import Income from './pages/host/Income';
import Dashboard from './pages/host/Dashboard';
import Host from './components/Host';
import HostVans from './pages/host/HostVans';
import HostVan from './pages/host/HostVan';
import HostVanInfo from './pages/host/HostVanInfo';
import HostVanPhotos from './pages/host/HostVanPhotos';
import HostVanPricing from './pages/host/HostVanPricing';

import "./server"

function App() {
  return (
    <div className='main'>
      <BrowserRouter>        
        
          <Routes>
            <Route element={<Layout />}>
              <Route path='/' element={<Home />} />
              <Route path='about' element={<About />} />
              {/* vanDetails could be made into relative path but its not necessary a better solution as its more code: */}
              {/* <Route path='vans'>
                <Route index element={<Vans />} />
                <Route path=':id' element={<VanDetail />} />  
              </Route> */}

              <Route path='vans' element={<Vans />} />
              <Route path='vans/:id' element={<VanDetail />} /> {/* ":" means that it's a variable not a predefinet string */}
              
              <Route path='host' element={<Host />}>
                <Route index element={<Dashboard />} /> {/* Index means that its a default route for the parent element */} 
                <Route path='income' element={<Income />} />
                <Route path='reviews' element={<Reviews />} />
                <Route path='vans' element={<HostVans />} />
                <Route path='vans/:id' element={<HostVan />} >
                  <Route index element={<HostVanInfo />} />
                  <Route path='photos' element={<HostVanPhotos />} />
                  <Route path='pricing' element={<HostVanPricing />} />
                </Route>
              </Route>
            </Route>
          </Routes>        
      </BrowserRouter>
    </div>    
  );
}

export default App;
