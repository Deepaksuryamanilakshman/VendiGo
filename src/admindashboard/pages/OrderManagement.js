// OrderManagement.js
import React, { useState } from "react";
import AdminLayout from "../components/AdminLayout";
import { FaEdit, FaTrashAlt, FaCheck, FaTimes } from "react-icons/fa";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import "./OrderManagement.css";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

function OrderManagement() {
  const initialOrders = [
    { id: "O001", customer: "Ramesh", product: "Laptop", quantity: 2, status: "Pending" },
    { id: "O002", customer: "Sita", product: "Headphones", quantity: 1, status: "Delivered" },
    { id: "O003", customer: "Rahul", product: "Coffee Mug", quantity: 4, status: "Cancelled" },
    { id: "O004", customer: "Geeta", product: "T-shirt", quantity: 3, status: "Pending" },
    { id: "O005", customer: "Kiran", product: "Notebook", quantity: 5, status: "Delivered" },
    { id: "O006", customer: "Anita", product: "Smartphone", quantity: 1, status: "Pending" },
    { id: "O001", customer: "Ramesh", product: "Laptop", quantity: 2, status: "Pending" },
    { id: "O002", customer: "Sita", product: "Headphones", quantity: 1, status: "Delivered" },
    { id: "O003", customer: "Rahul", product: "Coffee Mug", quantity: 4, status: "Cancelled" },
    { id: "O004", customer: "Geeta", product: "T-shirt", quantity: 3, status: "Pending" },
    { id: "O005", customer: "Kiran", product: "Notebook", quantity: 5, status: "Delivered" },
    { id: "O006", customer: "Anita", product: "Smartphone", quantity: 1, status: "Pending" },
    { id: "O001", customer: "Ramesh", product: "Laptop", quantity: 2, status: "Pending" },
    { id: "O002", customer: "Sita", product: "Headphones", quantity: 1, status: "Delivered" },
    { id: "O003", customer: "Rahul", product: "Coffee Mug", quantity: 4, status: "Cancelled" },
    { id: "O004", customer: "Geeta", product: "T-shirt", quantity: 3, status: "Pending" },
    { id: "O005", customer: "Kiran", product: "Notebook", quantity: 5, status: "Delivered" },
    { id: "O006", customer: "Anita", product: "Smartphone", quantity: 1, status: "Pending" },
    { id: "O001", customer: "Ramesh", product: "Laptop", quantity: 2, status: "Pending" },
    { id: "O002", customer: "Sita", product: "Headphones", quantity: 1, status: "Delivered" },
    { id: "O003", customer: "Rahul", product: "Coffee Mug", quantity: 4, status: "Cancelled" },
    { id: "O004", customer: "Geeta", product: "T-shirt", quantity: 3, status: "Pending" },
    { id: "O005", customer: "Kiran", product: "Notebook", quantity: 5, status: "Delivered" },
    { id: "O006", customer: "Anita", product: "Smartphone", quantity: 1, status: "Pending" },
  ];

  const [orders, setOrders] = useState(initialOrders);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 8;

  const filteredOrders = orders.filter(
    o =>
      (o.customer.toLowerCase().includes(search.toLowerCase()) || o.product.toLowerCase().includes(search.toLowerCase())) &&
      (filterStatus ? o.status === filterStatus : true)
  );

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  const handleStatusChange = (id, status) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  };

  const handleDelete = (id) => {
    setOrders(prev => prev.filter(o => o.id !== id));
  };

  // Chart data
  const pendingCount = orders.filter(o => o.status === "Pending").length;
  const deliveredCount = orders.filter(o => o.status === "Delivered").length;
  const cancelledCount = orders.filter(o => o.status === "Cancelled").length;

  const summaryData = {
    labels: ["Total Orders", "Delivered", "Pending", "Cancelled"],
    datasets: [
      {
        label: "Orders",
        data: [orders.length, deliveredCount, pendingCount, cancelledCount],
        backgroundColor: ["#3b82f6", "#22c55e", "#facc15", "#ef4444"],
      },
    ],
  };

  const statusPieData = {
    labels: ["Delivered", "Pending", "Cancelled"],
    datasets: [
      {
        data: [deliveredCount, pendingCount, cancelledCount],
        backgroundColor: ["#22c55e", "#facc15", "#ef4444"],
      },
    ],
  };

  return (
    <AdminLayout>
      <div className="order-management-container">
        <h1 className="page-title">Order Management</h1>

    {/* Charts Row */}
<div className="charts-row" style={{ display: "flex", justifyContent: "space-between", marginBottom: "80px" }}>
  {/* Summary Chart */}
  <div style={{ flex: "0 0 45%", height: "250px", paddingRight: "5%", display: "flex", flexDirection: "column" }}>
    <div className="chart-card-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
      <h3 style={{ margin: 0 }}>Summary</h3>
      <div className="chart-card-actions" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <button className="view-more-btn" style={{ padding: "4px 8px", fontSize: "12px" }}>View More</button>
        <span className="dots" style={{ cursor: "pointer", fontSize: "18px" }}>⋮</span>
      </div>
    </div>
    <Bar
      data={summaryData}
      style={{ flex: 1 }}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { enabled: true } },
        scales: { y: { beginAtZero: true, stepSize: 1 } },
      }}
    />
  </div>

  {/* Status Pie Chart */}
  <div style={{ flex: "0 0 45%", height: "250px", display: "flex", flexDirection: "column" }}>
    <div className="chart-card-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
      <h3 style={{ margin: 0 }}>Status</h3>
      <div className="chart-card-actions" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <button className="view-more-btn" style={{ padding: "4px 8px", fontSize: "12px" }}>View More</button>
        <span className="dots" style={{ cursor: "pointer", fontSize: "18px" }}>⋮</span>
      </div>
    </div>
    <Pie
      data={statusPieData}
      style={{ flex: 1, maxWidth: "80%", margin: "0 auto" }}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: true, position: "right", labels: { boxWidth: 10, padding: 15 } },
          tooltip: { enabled: true },
        },
      }}
    />
  </div>
</div>

        {/* Search & Filter */}
        <div className="filters-bar">
          <input
            type="text"
            placeholder="Search by customer or product..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
            <option value="">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        {/* Order Table */}
        <div className="table-wrapper">
          <table className="order-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.map(order => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.customer}</td>
                  <td>{order.product}</td>
                  <td>{order.quantity}</td>
                  <td>
                    <span className={`status-badge ${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>
                    {order.status === "Pending" && (
                      <button className="action-btn approve" onClick={() => handleStatusChange(order.id, "Delivered")}>
                        <FaCheck /> Mark Delivered
                      </button>
                    )}
                    <button className="action-btn cancel" onClick={() => handleStatusChange(order.id, "Cancelled")}>
                      <FaTimes /> Cancel
                    </button>
                    <button className="action-btn delete" onClick={() => handleDelete(order.id)}>
                      <FaTrashAlt /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              className={currentPage === i + 1 ? "page-btn active" : "page-btn"}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}

export default OrderManagement;
