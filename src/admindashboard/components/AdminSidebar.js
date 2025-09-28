import React from "react";
import { NavLink } from "react-router-dom";
import { FaTachometerAlt, FaUsers, FaBox, FaShoppingCart, FaMoneyBill, FaChartBar, FaFileAlt } from "react-icons/fa";
import "./AdminSidebar.css";

function AdminSidebar() {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Admin Panel</h2>
      <nav>
        <NavLink to="/admin/dashboard" activeClassName="active">
          <FaTachometerAlt className="icon" /> Dashboard
        </NavLink>
        <NavLink to="/admin/users" activeClassName="active">
          <FaUsers className="icon" /> User Management
        </NavLink>
        <NavLink to="/admin/products" activeClassName="active">
          <FaBox className="icon" /> Product Management
        </NavLink>
        <NavLink to="/admin/orders" activeClassName="active">
          <FaShoppingCart className="icon" /> Order Management
        </NavLink>
        <NavLink to="/admin/payments" activeClassName="active">
          <FaMoneyBill className="icon" /> Payments
        </NavLink>
        <NavLink to="/admin/reports" activeClassName="active">
          <FaChartBar className="icon" /> Reports & Analytics
        </NavLink>
        <NavLink to="/admin/content" activeClassName="active">
          <FaFileAlt className="icon" /> Content Management
        </NavLink>
      </nav>
    </div>
  );
}

export default AdminSidebar;
