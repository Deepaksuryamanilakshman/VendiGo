import React, { useState } from "react";
import AdminLayout from "../components/AdminLayout";
import { FaTrashAlt, FaEdit, FaSave, FaTimes } from "react-icons/fa";
import { Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";
import "./UserManagement.css";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

function UserManagement() {
  const initialUsers = [
    { id: "U001", name: "Ramesh", role: "Retailer", status: "Active", email: "ramesh@gmail.com", phone: "9876543210", joined: "2023-01-12", lastLogin: "2025-09-20" },
    { id: "U002", name: "Sita", role: "Supplier", status: "Inactive", email: "sita@gmail.com", phone: "9876543211", joined: "2023-03-15", lastLogin: "2025-09-18" },
    { id: "U003", name: "Rahul", role: "Admin", status: "Active", email: "rahul@gmail.com", phone: "9876543212", joined: "2022-11-05", lastLogin: "2025-09-22" },
    { id: "U004", name: "Geeta", role: "Retailer", status: "Inactive", email: "geeta@gmail.com", phone: "9876543213", joined: "2023-02-21", lastLogin: "2025-09-19" },
    { id: "U005", name: "Kiran", role: "Supplier", status: "Active", email: "kiran@gmail.com", phone: "9876543214", joined: "2023-04-08", lastLogin: "2025-09-23" },
    { id: "U006", name: "Anita", role: "Retailer", status: "Active", email: "anita@gmail.com", phone: "9876543215", joined: "2023-01-28", lastLogin: "2025-09-22" },
    { id: "U007", name: "Vikram", role: "Supplier", status: "Active", email: "vikram@gmail.com", phone: "9876543216", joined: "2022-12-10", lastLogin: "2025-09-21" },
    { id: "U008", name: "Sneha", role: "Admin", status: "Inactive", email: "sneha@gmail.com", phone: "9876543217", joined: "2023-03-30", lastLogin: "2025-09-20" },
    { id: "U009", name: "Manish", role: "Retailer", status: "Active", email: "manish@gmail.com", phone: "9876543218", joined: "2023-05-05", lastLogin: "2025-09-23" },
    { id: "U010", name: "Priya", role: "Supplier", status: "Active", email: "priya@gmail.com", phone: "9876543219", joined: "2023-02-17", lastLogin: "2025-09-21" },
    { id: "U011", name: "Ajay", role: "Admin", status: "Inactive", email: "ajay@gmail.com", phone: "9876543220", joined: "2023-04-25", lastLogin: "2025-09-18" },
    { id: "U012", name: "Nisha", role: "Retailer", status: "Active", email: "nisha@gmail.com", phone: "9876543221", joined: "2023-01-20", lastLogin: "2025-09-22" },
  ];

  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 8;

  const filteredUsers = users.filter(user => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.id.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = filterRole ? user.role === filterRole : true;
    const matchesStatus = filterStatus ? user.status === filterStatus : true;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const toggleSelectUser = (id) => {
    setSelectedUsers(prev =>
      prev.includes(id) ? prev.filter(uid => uid !== id) : [...prev, id]
    );
  };

  const handleDelete = (id) => {
    setUsers(prev => prev.filter(u => u.id !== id));
  };

  const handleSaveEdit = (id, name, role) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, name, role } : u));
    setEditingUser(null);
  };

  // Chart data
  const activeCount = users.filter(u => u.status === "Active").length;
  const inactiveCount = users.filter(u => u.status === "Inactive").length;

  const statusPieData = {
    labels: ["Active Users", "Inactive Users"],
    datasets: [
      {
        data: [activeCount, inactiveCount],
        backgroundColor: ["#4ade80", "#f87171"],
      },
    ],
  };

  const roles = ["Retailer", "Supplier", "Admin"];
  const roleCounts = roles.map(role => users.filter(u => u.role === role).length);
  const roleBarData = {
    labels: roles,
    datasets: [
      {
        label: "Users per Role",
        data: roleCounts,
        backgroundColor: ["#60a5fa", "#fbbf24", "#a78bfa"],
      },
    ],
  };

  const summaryData = {
    labels: ["Total Users", "Active Users", "Inactive Users", "Selected Users"],
    datasets: [
      {
        label: "Users",
        data: [users.length, activeCount, inactiveCount, selectedUsers.length],
        backgroundColor: ["#3b82f6", "#22c55e", "#ef4444", "#facc15"],
      },
    ],
  };

  return (
    <AdminLayout>
      <div className="user-management-container">
        <h1>User Management</h1>

      {/* Charts Row */}
<div className="charts-row">
  {/* Summary Chart */}
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

  {/* User Status Pie Chart */}
  <div className="chart-card">
    <div className="chart-card-header">
      <h3>User Status</h3>
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
          legend: {
            display: true,
            position: "right",
            labels: { boxWidth: 10, padding: 15, font: { size: 12 } },
          },
          tooltip: { enabled: true },
        },
      }}
    />
  </div>

  {/* Users by Role Chart */}
  <div className="chart-card">
    <div className="chart-card-header">
      <h3>Users by Role</h3>
      <div className="chart-card-actions">
        <button className="view-more-btn">View More</button>
        <span className="dots">⋮</span>
      </div>
    </div>
    <Bar data={roleBarData} />
  </div>
</div>


        {/* Filters */}
        <div className="filters-bar">
          <input
            type="text"
            placeholder="Search by name, ID or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select value={filterRole} onChange={(e) => setFilterRole(e.target.value)}>
            <option value="">All Roles</option>
            <option value="Retailer">Retailer</option>
            <option value="Supplier">Supplier</option>
            <option value="Admin">Admin</option>
          </select>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        {/* User Table */}
        <div className="table-wrapper">
          <table className="user-table">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={selectedUsers.length === currentUsers.length && currentUsers.length > 0}
                    onChange={() => {
                      if (selectedUsers.length === currentUsers.length) setSelectedUsers([]);
                      else setSelectedUsers(currentUsers.map(u => u.id));
                    }}
                  />
                </th>
                <th>User ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Status</th>
                <th>Date Joined</th>
                <th>Last Login</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map(user => (
                <tr key={user.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => toggleSelectUser(user.id)}
                    />
                  </td>
                  <td>{user.id}</td>
                  <td>{editingUser === user.id ? <input type="text" defaultValue={user.name} id={`edit-name-${user.id}`} /> : user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{editingUser === user.id ? <select defaultValue={user.role} id={`edit-role-${user.id}`}><option>Retailer</option><option>Supplier</option><option>Admin</option></select> : user.role}</td>
                  <td><span className={`status-badge ${user.status.toLowerCase()}`}>{user.status}</span></td>
                  <td>{user.joined}</td>
                  <td>{user.lastLogin}</td>
                  <td>
                    {editingUser === user.id ? (
                      <>
                        <button className="action-btn save" onClick={() =>
                          handleSaveEdit(
                            user.id,
                            document.getElementById(`edit-name-${user.id}`).value,
                            document.getElementById(`edit-role-${user.id}`).value
                          )}><FaSave /> Save</button>
                        <button className="action-btn cancel" onClick={() => setEditingUser(null)}><FaTimes /> Cancel</button>
                      </>
                    ) : (
                      <>
                        <button className="action-btn edit" onClick={() => setEditingUser(user.id)}><FaEdit /> Edit</button>
                        <button className="action-btn delete" onClick={() => handleDelete(user.id)}><FaTrashAlt /> Delete</button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => (
            <button key={i + 1} className={currentPage === i + 1 ? "page-btn active" : "page-btn"} onClick={() => setCurrentPage(i + 1)}>
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}

export default UserManagement;
