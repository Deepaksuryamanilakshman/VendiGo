import React from "react";
import AdminLayout from "../components/AdminLayout";
import {
  FaEdit, FaTrash, FaSync, FaPlus, FaDownload, FaEllipsisV, FaShareAlt,
  FaCheck, FaTimes, FaArchive, FaCog, FaQrcode, FaBell, FaUpload
} from "react-icons/fa";
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend,
  BarChart, Bar, PieChart, Pie, Cell
} from "recharts";
import "./Dashboard.css";

function Dashboard() {
  // ===== Data =====
  const summaryCards = [
    { title: "Total Users", value: 102, spark: [5, 10, 8, 12, 7], color: "#4caf50" },
    { title: "Suppliers", value: 40, spark: [2, 5, 3, 6, 4], color: "#2196f3" },
    { title: "Retailers", value: 62, spark: [3, 6, 4, 8, 5], color: "#ff9800" },
    { title: "Orders Today", value: 25, spark: [1, 3, 2, 4, 3], color: "#f44336" },
  ];

  const salesData = [
    { day: "Mon", orders: 12, revenue: 2500 },
    { day: "Tue", orders: 19, revenue: 4000 },
    { day: "Wed", orders: 3, revenue: 1500 },
    { day: "Thu", orders: 5, revenue: 2000 },
    { day: "Fri", orders: 2, revenue: 1200 },
    { day: "Sat", orders: 3, revenue: 1300 },
    { day: "Sun", orders: 9, revenue: 3200 },
  ];

  const orderStatus = [
    { name: "Completed", value: 480 },
    { name: "Pending", value: 18 },
    { name: "Failed", value: 5 },
  ];

  const revenueTrend = [
    { month: "Jan", revenue: 12000 },
    { month: "Feb", revenue: 18000 },
    { month: "Mar", revenue: 14000 },
    { month: "Apr", revenue: 22000 },
    { month: "May", revenue: 20000 },
    { month: "Jun", revenue: 25000 },
  ];

  const COLORS = ["#4caf50", "#ff9800", "#f44336"];

  const recentOrders = [
    { id: "#101", user: "Retailer A", amount: 2500, status: "Completed" },
    { id: "#102", user: "Supplier B", amount: 8000, status: "Pending" },
    { id: "#103", user: "Retailer C", amount: 5200, status: "Failed" },
  ];

  return (
    <AdminLayout>
      <div className="dashboard-container">
        <h1 className="dashboard-title">Admin Dashboard</h1>

        {/* ===== Global Toolbar ===== */}
        <div className="tools-bar">
          <button><FaPlus /> New</button>
          <button><FaUpload /> Import</button>
          <button><FaDownload /> Export</button>
          <button><FaSync /> Refresh</button>
          <button><FaCog /> Settings</button>
          <button><FaBell /> Notifications</button>
          <button><FaQrcode /> QR Code</button>
          <button><FaShareAlt /> Share</button>
        </div>

        {/* ===== Summary Cards with Sparklines ===== */}
        <div className="card-container">
          {summaryCards.map((card, i) => (
            <div key={i} className="card">
              <div className="card-header">
                <h3>{card.title}</h3>
                <button className="card-action"><FaEllipsisV /></button>
              </div>
              <p>{card.value}</p>
              <ResponsiveContainer width="100%" height={40}>
                <LineChart data={card.spark.map((v, idx) => ({ idx, value: v }))}>
                  <Line type="monotone" dataKey="value" stroke={card.color} strokeWidth={2} dot={false}/>
                </LineChart>
              </ResponsiveContainer>
            </div>
          ))}
        </div>

        {/* ===== Charts Section ===== */}
        <div className="charts-wrapper">
          <div className="chart-box">
            <h2>Sales Overview</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <XAxis dataKey="day"/>
                <YAxis/>
                <Tooltip/>
                <Legend/>
                <Bar dataKey="orders" fill="#8884d8"/>
                <Bar dataKey="revenue" fill="#82ca9d"/>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-box">
            <h2>Revenue Trend</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueTrend}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="month"/>
                <YAxis/>
                <Tooltip/>
                <Legend/>
                <Line type="monotone" dataKey="revenue" stroke="#ff7300" strokeWidth={3}/>
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-box">
            <h2>Order Status</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={orderStatus} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {orderStatus.map((entry, idx) => (
                    <Cell key={idx} fill={COLORS[idx % COLORS.length]}/>
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ===== Recent Orders Table ===== */}
        <div className="table-section">
          <h2>Recent Orders</h2>
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>User</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order, i) => (
                <tr key={i}>
                  <td>{order.id}</td>
                  <td>{order.user}</td>
                  <td>₹{order.amount}</td>
                  <td><span className={`status-badge ${order.status.toLowerCase()}`}>{order.status}</span></td>
                  <td>
                    <button className="action-btn edit"><FaEdit /></button>
                    <button className="action-btn delete"><FaTrash /></button>
                    <button className="action-btn approve"><FaCheck /></button>
                    <button className="action-btn reject"><FaTimes /></button>
                    <button className="action-btn archive"><FaArchive /></button>
                    <button className="action-btn share"><FaShareAlt /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </AdminLayout>
  );
}

export default Dashboard;
