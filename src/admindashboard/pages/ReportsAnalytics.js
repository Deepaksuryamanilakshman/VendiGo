import React, { useState } from "react";
import AdminLayout from "../components/AdminLayout";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

function ReportsAnalytics() {
  const [timeRange, setTimeRange] = useState("Monthly");

  const revenueTrend = [
    { month: "Jan", revenue: 12000 },
    { month: "Feb", revenue: 15000 },
    { month: "Mar", revenue: 18000 },
    { month: "Apr", revenue: 22000 },
    { month: "May", revenue: 17000 },
    { month: "Jun", revenue: 25000 },
  ];

  const categoryData = [
    { name: "Electronics", value: 4000 },
    { name: "Clothing", value: 3000 },
    { name: "Grocery", value: 2000 },
    { name: "Home", value: 2780 },
    { name: "Books", value: 1890 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#ef4444"];

  const recentReports = [
    { id: 1, name: "Monthly Sales Report", date: "2025-09-25", status: "Completed" },
    { id: 2, name: "Refund Analysis", date: "2025-09-22", status: "Pending" },
    { id: 3, name: "User Activity Report", date: "2025-09-20", status: "Completed" },
  ];

  return (
    <AdminLayout>
      <div style={{ padding: "20px" }}>
        <h1 style={{ fontSize: "26px", fontWeight: "bold", marginBottom: "10px" }}>
          Reports & Analytics
        </h1>
        <p style={{ marginBottom: "20px", color: "#555" }}>
          View detailed insights on sales, categories, and revenue performance.
        </p>

        {/* Filters & Actions */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            style={{ padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }}
          >
            <option>Daily</option>
            <option>Weekly</option>
            <option>Monthly</option>
            <option>Yearly</option>
          </select>
          <button style={{ padding: "8px 12px", borderRadius: "6px", border: "1px solid #ccc" }}>
            Export PDF
          </button>
          <button style={{ padding: "8px 12px", borderRadius: "6px", border: "1px solid #ccc" }}>
            Export Excel
          </button>
          <button style={{ padding: "8px 12px", borderRadius: "6px", border: "1px solid #ccc" }}>
            Refresh Data
          </button>
        </div>

        {/* Graphs Section */}
        <div style={{ display: "flex", gap: "20px", marginBottom: "20px", flexWrap: "wrap" }}>
          {/* Revenue Trend */}
          <div
            style={{
              flex: 1,
              minWidth: "300px",
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "15px",
            }}
          >
            <h3 style={{ marginBottom: "10px" }}>Revenue Trend</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={revenueTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#ff7300"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Category Sales */}
          <div
            style={{
              flex: 1,
              minWidth: "300px",
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "15px",
            }}
          >
            <h3 style={{ marginBottom: "10px" }}>Top Categories</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Revenue Breakdown */}
          <div
            style={{
              flex: 1,
              minWidth: "300px",
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "15px",
            }}
          >
            <h3 style={{ marginBottom: "10px" }}>Revenue Breakdown</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Reports */}
        <div
          style={{
            marginTop: "20px",
            border: "1px solid #ddd",
            borderRadius: "10px",
            padding: "15px",
          }}
        >
          <h3 style={{ marginBottom: "10px" }}>Recent Reports</h3>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>ID</th>
                <th style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>Name</th>
                <th style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>Date</th>
                <th style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>Status</th>
                <th style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentReports.map((r) => (
                <tr key={r.id}>
                  <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>{r.id}</td>
                  <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>{r.name}</td>
                  <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>{r.date}</td>
                  <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>
                    <span
                      style={{
                        padding: "3px 8px",
                        borderRadius: "5px",
                        backgroundColor:
                          r.status === "Completed" ? "#22c55e" : "#facc15",
                        color: "#fff",
                      }}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>
                    <button style={{ marginRight: "6px", padding: "4px 8px" }}>View</button>
                    <button style={{ marginRight: "6px", padding: "4px 8px" }}>Download</button>
                    <button style={{ padding: "4px 8px" }}>Delete</button>
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

export default ReportsAnalytics;
