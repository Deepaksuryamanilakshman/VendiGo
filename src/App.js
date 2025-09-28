// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";

// Public Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import FAQ from "./pages/FAQ";
import Privacy from "./pages/Privacy";
import RetailerApp from "./Retailer/App";

// Admin Components
import Header from "./admindashboard/components/AdminHeader.js";
import Dashboard from "./admindashboard/pages/Dashboard";
import UserManagement from "./admindashboard/pages/UserManagement";
import ProductManagement from "./admindashboard/pages/ProductManagement.js";
import OrderManagement from "./admindashboard/pages/OrderManagement";
import Payments from "./admindashboard/pages/Payments.js";
import ReportsAnalytics from "./admindashboard/pages/ReportsAnalytics.js";
import ContentManagement from "./admindashboard/pages/ContentManagement.js";

// Layouts
function PublicLayout() {
  return (
    <>
      <Navbar />
      <div style={{ minHeight: "80vh", padding: "0px" }}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

function AdminLayout() {
  return (
    <>
      <Header />
      <div style={{ minHeight: "80vh", padding: "0px" }}>
        <Outlet />
      </div>
    </>
  );
}

function App() {
  return (
<Router>
  <Routes>
    {/* Public Routes */}
    <Route element={<PublicLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/privacy" element={<Privacy />} />
    </Route>

    {/* Retailer Routes (no PublicLayout header/footer) */}
    <Route path="/retailer/*" element={<RetailerApp />} />

    {/* Admin Routes */}
    <Route path="/admin" element={<AdminLayout />}>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="users" element={<UserManagement />} />
      <Route path="products" element={<ProductManagement />} />
      <Route path="orders" element={<OrderManagement />} />
      <Route path="payments" element={<Payments />} />
      <Route path="reports" element={<ReportsAnalytics />} />
      <Route path="content" element={<ContentManagement />} />
    </Route>
  </Routes>
</Router>

  );
}

export default App;
