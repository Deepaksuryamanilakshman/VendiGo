// ProductManagement.js
import React, { useState } from "react";
import AdminLayout from "../components/AdminLayout";
import { FaCheck, FaEdit, FaTrashAlt, FaStar } from "react-icons/fa";
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
import "./ProductManagement.css";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

function ProductManagement() {
  const initialProducts = [
    { id: "P001", name: "Laptop", supplier: "TechStore", category: "Electronics", status: "Pending" },
    { id: "P002", name: "Headphones", supplier: "SoundHub", category: "Electronics", status: "Approved" },
    { id: "P003", name: "Coffee Mug", supplier: "HomeEssentials", category: "Kitchen", status: "Pending" },
    { id: "P004", name: "T-shirt", supplier: "FashionHub", category: "Clothing", status: "Approved" },
    { id: "P005", name: "Notebook", supplier: "StationeryWorld", category: "Stationery", status: "Pending" },
    { id: "P006", name: "Smartphone", supplier: "TechStore", category: "Electronics", status: "Pending" },
  ];

  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const filteredProducts = products.filter(
    p =>
      (p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.supplier.toLowerCase().includes(search.toLowerCase())) &&
      (filterStatus ? p.status === filterStatus : true)
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handleApprove = (id) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, status: "Approved" } : p));
  };

  const handleDelete = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const handleFeature = (id) => {
    alert(`Product ${id} is now featured!`);
  };

  // Chart data
  const approvedCount = products.filter(p => p.status === "Approved").length;
  const pendingCount = products.filter(p => p.status === "Pending").length;

  const statusPieData = {
    labels: ["Approved", "Pending"],
    datasets: [
      {
        data: [approvedCount, pendingCount],
        backgroundColor: ["#22c55e", "#f87171"],
      },
    ],
  };

  const categoryCounts = [...new Set(products.map(p => p.category))].map(cat =>
    products.filter(p => p.category === cat).length
  );
  const categories = [...new Set(products.map(p => p.category))];
  const categoryBarData = {
    labels: categories,
    datasets: [
      {
        label: "Products per Category",
        data: categoryCounts,
        backgroundColor: ["#60a5fa", "#fbbf24", "#a78bfa", "#f472b6", "#34d399"],
      },
    ],
  };

  const summaryData = {
    labels: ["Total Products", "Approved", "Pending"],
    datasets: [
      {
        label: "Products",
        data: [products.length, approvedCount, pendingCount],
        backgroundColor: ["#3b82f6", "#22c55e", "#ef4444"],
      },
    ],
  };

  return (
    <AdminLayout>
      <div className="product-management-container">
        <h1 className="page-title">Product Management</h1>

        {/* Summary Chart */}
        <div className="charts-row">
              <div className="chart-card">
                <div className="chart-card-header">
                  <h3>Status</h3>
                  <div className="chart-card-actions">
                    <button className="view-more-btn">View More</button>
                    <span className="dots">⋮</span>
                  </div>
                </div>
                <Pie
                  style={{ marginTop: "-30px", paddingLeft: "20px", width: "250px" }}
                  data={statusPieData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: { display: true, position: "right", labels: { boxWidth: 10, padding: 15 } },
                      tooltip: { enabled: true },
                    },
                  }}
                />
              </div>
          <div className="chart-card">
            <div className="chart-card-header">
              <h3>Summary</h3>
              <div className="chart-card-actions">
                <button className="view-more-btn">View More</button>
                <span className="dots">⋮</span>
              </div>
            </div>
            <Bar
              data={summaryData}
              options={{
                responsive: true,
                plugins: { legend: { display: false }, tooltip: { enabled: true } },
                scales: { y: { beginAtZero: true, stepSize: 1 } },
              }}
            />
          </div>


          <div className="chart-card">
            <div className="chart-card-header">
              <h3>Products by Category</h3>
              <div className="chart-card-actions">
                <button className="view-more-btn">View More</button>
                <span className="dots">⋮</span>
              </div>
            </div>
            <Bar data={categoryBarData} />
          </div>
        </div>

        {/* Filters */}
        <div className="filters-bar">
          <input
            type="text"
            placeholder="Search by product or supplier..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
            <option value="">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
          </select>
        </div>

        {/* Product Table */}
        <div className="table-wrapper">
          <table className="product-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Product</th>
                <th>Supplier</th>
                <th>Category</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map(p => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.name}</td>
                  <td>{p.supplier}</td>
                  <td>{p.category}</td>
                  <td><span className={`status-badge ${p.status.toLowerCase()}`}>{p.status}</span></td>
                  <td>
                    {p.status === "Pending" && (
                      <button className="action-btn approve" onClick={() => handleApprove(p.id)}>
                        <FaCheck /> Approve
                      </button>
                    )}
                    <button className="action-btn edit"><FaEdit /> Edit</button>
                    <button className="action-btn delete" onClick={() => handleDelete(p.id)}><FaTrashAlt /> Delete</button>
                    <button className="action-btn feature" onClick={() => handleFeature(p.id)}><FaStar /> Feature</button>
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

export default ProductManagement;
