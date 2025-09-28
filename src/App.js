import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import FAQ from './pages/FAQ';
import Privacy from './pages/Privacy';

import Order from './supplier/order';
import SideNav  from './supplier/sideNav';

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ minHeight: '80vh' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/privacy" element={<Privacy />} />

          {/* supplier */}
          <Route path="/order" element={<Order />} />
          <Route path="/sidebar" element={<SideNav />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
