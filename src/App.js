
import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function About() {
  return (
    <h1>About page</h1>
  )
}

function Home() {
  return (
    <div className="App">
        <h1>Hello, haidoo, ca va</h1>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to={'/'}>Home</Link> {/* Link is rendered into <a></a> tag */}
        <Link to={'/about'}> About</Link>
      </nav>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
      </Routes>
    </BrowserRouter>    
  );
}

export default App;
