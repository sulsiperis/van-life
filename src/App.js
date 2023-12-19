import './App.css';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route} from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Vans, { loader as vansLoader } from './pages/vans/Vans';
import VanDetail, { loader as vanDetailLoader } from './pages/vans/VanDetail';
import Layout from './components/Layout';
import Reviews from './pages/host/Reviews';
import Income from './pages/host/Income';
import Dashboard from './pages/host/Dashboard';
import Host from './components/Host';
import HostVans, { loader as hostVansLoader } from './pages/host/HostVans';
import HostVan, { loader as hostVanDetailLoader } from './pages/host/HostVan';
import HostVanInfo from './pages/host/HostVanInfo';
import HostVanPhotos from './pages/host/HostVanPhotos';
import HostVanPricing from './pages/host/HostVanPricing';
import NotFound from './pages/NotFound';
import Error from './components/Error';
import Login from './pages/Login';
import { requireAuth } from './utils';

import "./server"

const router = createBrowserRouter(createRoutesFromElements(
  <Route element={<Layout />}>
    <Route path='login' element={<Login />} />
    <Route path='*' element={<NotFound /> } /> {/* catch all route for not found pages */}
    <Route path='/' element={<Home />} />
    <Route path='about' element={<About />} />
    <Route 
      path='vans' 
      element={<Vans />} 
      loader={vansLoader} // loader delays element rendering until loader is finnished
      errorElement={<Error />} //error element for automatic error handling
    /> 
    <Route path='vans/:id' element={<VanDetail />} loader={vanDetailLoader} /> {/* ":" means that it's a variable not a predefinet string */}
    <Route path='host' element={<Host />} >
      <Route index element={<Dashboard />} loader={async () => await requireAuth()} /> {/* Index means that its a default route for the parent element */} 
      <Route path='income' element={<Income />} loader={ async () => await requireAuth() } />
      <Route path='reviews' element={<Reviews />} loader={ async () => await requireAuth() } />
      <Route path='vans' element={<HostVans />} loader={hostVansLoader} />
      <Route path='vans/:id' element={<HostVan />} loader={hostVanDetailLoader} >
        <Route index element={<HostVanInfo />} loader={async () => await requireAuth() } />
        <Route path='photos' element={<HostVanPhotos />} loader={async () => await requireAuth() } />
        <Route path='pricing' element={<HostVanPricing />} loader={async () => await requireAuth() } />
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
