import React, { useState } from "react";
import AdminLayout from "../components/AdminLayout";
import { Line, Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
} from "chart.js";
import { FaTrashAlt, FaEdit, FaCheck, FaTimes, FaDownload, FaRedo } from "react-icons/fa";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement
);

function Payments() {
  const initialPayments = [
    { id: "PM001", type: "Credit Card", status: "Completed", amount: 500 },
    { id: "PM002", type: "UPI", status: "Pending", amount: 120 },
    { id: "PM003", type: "Wallet", status: "Failed", amount: 300 },
    { id: "PM004", type: "Credit Card", status: "Completed", amount: 700 },
    { id: "PM005", type: "UPI", status: "Pending", amount: 150 },
    { id: "PM006", type: "Wallet", status: "Completed", amount: 250 },
  ];

  const [payments, setPayments] = useState(initialPayments);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const paymentsPerPage = 5;

  const filteredPayments = payments.filter(
    (p) =>
      (p.id.toLowerCase().includes(search.toLowerCase()) ||
        p.type.toLowerCase().includes(search.toLowerCase())) &&
      (filterStatus ? p.status === filterStatus : true)
  );

  const indexOfLastPayment = currentPage * paymentsPerPage;
  const indexOfFirstPayment = indexOfLastPayment - paymentsPerPage;
  const currentPayments = filteredPayments.slice(indexOfFirstPayment, indexOfLastPayment);
  const totalPages = Math.ceil(filteredPayments.length / paymentsPerPage);

  const completedCount = payments.filter((p) => p.status === "Completed").length;
  const pendingCount = payments.filter((p) => p.status === "Pending").length;
  const failedCount = payments.filter((p) => p.status === "Failed").length;

  // === Chart Data ===
  const paymentTrendData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Payments Amount",
        data: [500, 700, 400, 900, 600, 800],
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        tension: 0.3,
      },
    ],
  };

  const paymentStatusDoughnutData = {
    labels: ["Completed", "Pending", "Failed"],
    datasets: [
      {
        data: [completedCount, pendingCount, failedCount],
        backgroundColor: ["#22c55e", "#facc15", "#ef4444"],
        hoverOffset: 10,
      },
    ],
  };

  const paymentTypeData = {
    labels: ["Credit Card", "UPI", "Wallet"],
    datasets: [
      {
        label: "Amount",
        data: [
          payments.filter((p) => p.type === "Credit Card").reduce((a, b) => a + b.amount, 0),
          payments.filter((p) => p.type === "UPI").reduce((a, b) => a + b.amount, 0),
          payments.filter((p) => p.type === "Wallet").reduce((a, b) => a + b.amount, 0),
        ],
        backgroundColor: ["#3b82f6", "#facc15", "#22c55e"],
      },
    ],
  };

  const handleStatusChange = (id, status) => {
    setPayments((prev) => prev.map((p) => (p.id === id ? { ...p, status } : p)));
  };

  const handleDelete = (id) => {
    setPayments((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <AdminLayout>
      <div className="page-container">
        <h1 className="page-title">Payments</h1>
        <p>Monitor completed, pending, failed payments & refunds.</p>

        {/* Charts Row - all three charts in one row */}
        <div style={{ display: "flex", gap: "20px", marginTop: "30px", flexWrap: "wrap" }}>
          {/* Line Chart */}
          <div style={{ flex: "1 1 30%", padding: "10px", border: "1px solid #ddd", borderRadius: "8px", height:"250px"}}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
              <h3 style={{ margin: 0 }}>Payment Trends</h3>
              <div style={{ display: "flex", gap: "10px" }}>
                <button style={{ fontSize: "12px", padding: "4px 8px" }}>View More</button>
                <span style={{ cursor: "pointer", fontSize: "18px" }}>⋮</span>
              </div>
            </div>
            <Line data={paymentTrendData} options={{ responsive: true, plugins: { legend: { display: true } } }} />
          </div>

          {/* Doughnut Chart */}
          <div style={{ flex: "1 1 30%", padding: "10px", border: "1px solid #ddd", borderRadius: "8px",height:"250px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px"}}>
              <h3 style={{ margin: 0 }}>Payment Status</h3>
              <div style={{ display: "flex", gap: "10px" }}>
                <button style={{ fontSize: "12px", padding: "4px 8px" }}>View More</button>
                <span style={{ cursor: "pointer", fontSize: "18px" }}>⋮</span>
              </div>
            </div>
            <Doughnut 
            style={{ paddingLeft:"40px", width:"90%",marginTop:"-20px"}}
            data={paymentStatusDoughnutData} options={{ responsive: true, plugins: { legend: { position: "right" } } }} />
          </div>

          {/* Horizontal Bar Chart */}
          <div style={{ flex: "1 1 30%", padding: "10px", border: "1px solid #ddd", borderRadius: "8px",height:"250px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
              <h3 style={{ margin: 0 }}>Payments by Type</h3>
              <div style={{ display: "flex", gap: "10px" }}>
                <button style={{ fontSize: "12px", padding: "4px 8px" }}>View More</button>
                <span style={{ cursor: "pointer", fontSize: "18px" }}>⋮</span>
              </div>
            </div>
            <Bar data={paymentTypeData} options={{ indexAxis: "y", responsive: true, plugins: { legend: { display: false } } }} />
          </div>
        </div>

        {/* Filters */}
        <div style={{ marginTop: "30px", display: "flex", gap: "15px", alignItems: "center" }}>
          <input
            type="text"
            placeholder="Search by ID or type..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ padding: "6px", flex: 1, borderRadius: "4px", border: "1px solid #ccc" }}
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{ padding: "6px", borderRadius: "4px", border: "1px solid #ccc" }}
          >
            <option value="">All Status</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
            <option value="Failed">Failed</option>
          </select>
        </div>

    {/* Table Actions (outside table) */}
<div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
  <button
    style={{
      padding: "6px 12px",
      borderRadius: "4px",
      border: "1px solid #3b82f6",
      backgroundColor: "#3b82f6",
      color: "#fff",
      cursor: "pointer",
      fontSize: "14px",
      display: "flex",
      alignItems: "center",
      gap: "5px",
      marginTop:"10px"
    }}
    onClick={() => alert("Add new payment")}
  >
    <FaEdit /> Add Payment
  </button>
  <button
    style={{
      padding: "6px 12px",
      borderRadius: "4px",
      border: "1px solid #10b981",
      backgroundColor: "#10b981",
      color: "#fff",
      cursor: "pointer",
      fontSize: "14px",
      display: "flex",
      alignItems: "center",
      gap: "5px",
      marginTop:"10px"

    }}
  >
    <FaDownload /> Export All
  </button>
  <button
    style={{
      padding: "6px 12px",
      borderRadius: "4px",
      border: "1px solid #f59e0b",
      backgroundColor: "#f59e0b",
      color: "#fff",
      cursor: "pointer",
      fontSize: "14px",
      display: "flex",
      alignItems: "center",
      gap: "5px",
      marginTop:"10px"
    }}
    onClick={() => alert("Refresh table")}
  >
    <FaRedo /> Refresh
  </button>
</div>

{/* Payments Table */}
<div style={{ overflowX: "auto", border: "1px solid #ddd", borderRadius: "8px" }}>
  <table style={{ width: "100%", borderCollapse: "collapse" }}>
    <thead style={{ backgroundColor: "#f3f4f6" }}>
      <tr>
        <th style={{ textAlign: "left", padding: "8px", borderBottom: "1px solid #ddd" }}>ID</th>
        <th style={{ textAlign: "left", padding: "8px", borderBottom: "1px solid #ddd" }}>Type</th>
        <th style={{ textAlign: "left", padding: "8px", borderBottom: "1px solid #ddd" }}>Amount</th>
        <th style={{ textAlign: "left", padding: "8px", borderBottom: "1px solid #ddd" }}>Status</th>
      </tr>
    </thead>
    <tbody>
      {currentPayments.map((p) => (
        <tr key={p.id} style={{ borderBottom: "1px solid #ddd" }}>
          <td style={{ padding: "8px" }}>{p.id}</td>
          <td style={{ padding: "8px" }}>{p.type}</td>
          <td style={{ padding: "8px" }}>{p.amount}</td>
          <td style={{ padding: "8px" }}>
            <span
              style={{
                padding: "2px 6px",
                borderRadius: "4px",
                backgroundColor:
                  p.status === "Completed" ? "#22c55e" : p.status === "Pending" ? "#facc15" : "#ef4444",
                color: "#fff",
                fontSize: "12px",
                display: "inline-block",
              }}
            >
              {p.status}
            </span>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>


        {/* Pagination */}
        <div style={{ marginTop: "15px", display: "flex", gap: "5px" }}>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              style={{
                padding: "6px 10px",
                borderRadius: "4px",
                border: currentPage === i + 1 ? "2px solid #3b82f6" : "1px solid #ccc",
                backgroundColor: currentPage === i + 1 ? "#3b82f6" : "#fff",
                color: currentPage === i + 1 ? "#fff" : "#000",
              }}
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

export default Payments;
