import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import FAQ from "./pages/FAQ";
import Privacy from "./pages/Privacy";

import Dashboard from "./admindashboard/pages/Dashboard";
import UserManagement from "./admindashboard/pages/UserManagement";
import ProductManagement from "./admindashboard/pages/ProductManagement.js";
import OrderManagement from "./admindashboard/pages/OrderManagement";
import Payments from "./admindashboard/pages/Payments.js";
import ReportsAnalytics from "./admindashboard/pages/ReportsAnalytics.js";
import ContentManagement from "./admindashboard/pages/ContentManagement.js";

import Header from "./admindashboard/components/AdminHeader.js";

function LayoutWrapper({ children }) {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {/* Show Navbar only for non-admin pages */}
      {!isAdminRoute && <Navbar />}

      {/* Show Admin Header only for admin pages */}
      {isAdminRoute && <Header />}

      <div style={{ minHeight: "80vh", padding: "0px" }}>{children}</div>

      {/* Show Footer only for non-admin pages */}
      {!isAdminRoute && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <LayoutWrapper>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/privacy" element={<Privacy />} />

          {/* Admin Dashboard Routes */}
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/products" element={<ProductManagement />} />
          <Route path="/admin/orders" element={<OrderManagement />} />
          <Route path="/admin/payments" element={<Payments />} />
          <Route path="/admin/reports" element={<ReportsAnalytics />} />
          <Route path="/admin/content" element={<ContentManagement />} />
        </Routes>
      </LayoutWrapper>
    </Router>
  );
}

export default App;
