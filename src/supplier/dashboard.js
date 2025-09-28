import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const Dashboard = () => {
  // Dummy data for chart
  const data = [
    { name: "Jan", orders: 40 },
    { name: "Feb", orders: 55 },
    { name: "Mar", orders: 32 },
    { name: "Apr", orders: 78 },
    { name: "May", orders: 95 },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-700 text-white flex flex-col p-6">
        <h2 className="text-2xl font-bold mb-8">Supplier</h2>
        <nav className="flex flex-col space-y-4">
          <a href="#" className="hover:bg-blue-600 p-2 rounded">Dashboard</a>
          <a href="#" className="hover:bg-blue-600 p-2 rounded">Orders</a>
          <a href="#" className="hover:bg-blue-600 p-2 rounded">Products</a>
          <a href="#" className="hover:bg-blue-600 p-2 rounded">Payments</a>
          <a href="#" className="hover:bg-blue-600 p-2 rounded">Profile</a>
        </nav>
        <button className="mt-auto bg-red-600 hover:bg-red-700 p-2 rounded text-white">
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Header */}
        <div className="bg-white shadow rounded-lg p-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Supplier Dashboard</h1>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-gray-500 text-sm">Total Orders</h2>
            <p className="text-2xl font-bold text-gray-800">1,540</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-gray-500 text-sm">Pending Orders</h2>
            <p className="text-2xl font-bold text-yellow-600">120</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-gray-500 text-sm">Revenue</h2>
            <p className="text-2xl font-bold text-green-600">₹5.8L</p>
          </div>
        </div>

        {/* Chart + Recent Orders */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart */}
          <div className="bg-white p-6 rounded-lg shadow col-span-2">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Monthly Orders</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="orders" fill="#3B82F6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Recent Orders */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Orders</h2>
            <ul className="space-y-3">
              <li className="flex justify-between">
                <span>Order #1054</span>
                <span className="text-green-600">Completed</span>
              </li>
              <li className="flex justify-between">
                <span>Order #1055</span>
                <span className="text-yellow-600">Pending</span>
              </li>
              <li className="flex justify-between">
                <span>Order #1056</span>
                <span className="text-red-600">Cancelled</span>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
