import './App.css';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route} from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Vans, { loader as vansLoader } from './pages/vans/Vans';
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
import NotFound from './pages/NotFound';
import Error from './components/Error';
import Login from './pages/Login';

import "./server"

const router = createBrowserRouter(createRoutesFromElements(
  <Route element={<Layout />}>
    <Route path='login' element={<Login />} />
    <Route path='*' element={<NotFound /> } /> //catch all route for not found pages
    <Route path='/' element={<Home />} />
    <Route path='about' element={<About />} />
    <Route 
      path='vans' 
      element={<Vans />} 
      loader={vansLoader} // loader delays element rendering until loader is finnished
      errorElement={<Error />} //error element for automatic error handling
    /> 
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
))

function App() {
  return (
    <div className='main'>
      <RouterProvider router={router} />
    </div>    
  );
}

export default App;
