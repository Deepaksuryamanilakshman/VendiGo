import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  Search, 
  User, 
  ChevronDown, 
  ShoppingCart, 
  Clock, 
  CheckCircle, 
  Store,
  TrendingUp,
  Package,
  CreditCard,
  BarChart3,
  UserCircle,
  HelpCircle,
  Settings,
  LogOut,
  Plus,
  Edit,
  Trash2,
  Eye,
  Filter,
  Mail,
  Phone,
  MessageCircle,
  X,
  Send,
  Download,
  Star
} from 'lucide-react';

const QwipoSupplierDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [chatMessages, setChatMessages] = useState([
    { sender: 'bot', text: "Hi! I'm here to help with your supplier questions. What can I assist you with today?" }
  ]);
  const [chatInput, setChatInput] = useState('');

  // Sample data
  const [products, setProducts] = useState([
    { id: 1, name: "Wireless Headphones", sku: "WH-001", price: 89.99, stock: 45, category: "Electronics", status: "Active", image: "🎧" },
    { id: 2, name: "Cotton T-Shirt", sku: "CT-002", price: 24.99, stock: 120, category: "Clothing", status: "Active", image: "👕" },
    { id: 3, name: "Garden Hose", sku: "GH-003", price: 34.99, stock: 8, category: "Home", status: "Low Stock", image: "🌿" },
    { id: 4, name: "Running Shoes", sku: "RS-004", price: 129.99, stock: 67, category: "Sports", status: "Active", image: "👟" },
    { id: 5, name: "Smartphone Case", sku: "SC-005", price: 19.99, stock: 0, category: "Electronics", status: "Inactive", image: "📱" },
    { id: 6, name: "Yoga Mat", sku: "YM-006", price: 39.99, stock: 23, category: "Sports", status: "Active", image: "🧘" },
  ]);

  const itemsPerPage = 10;

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         product.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !categoryFilter || product.category === categoryFilter;
    const matchesStatus = !statusFilter || product.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage, 
    currentPage * itemsPerPage
  );

  // Navigation items
  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'profile', label: 'Profile', icon: UserCircle },
    { id: 'help', label: 'Help/Support', icon: HelpCircle },
  ];

  // Handle product operations
  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowProductModal(true);
  };

  const handleProductSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    setShowProductModal(false);
    setEditingProduct(null);
  };

  // Chat functionality
  const handleSendMessage = (message) => {
    if (!message.trim()) return;
    
    setChatMessages([...chatMessages, { sender: 'user', text: message }]);
    setChatInput('');
    
    // Simple bot response
    setTimeout(() => {
      let reply = "I'm here to help! Please check our FAQ or submit a support ticket for detailed assistance.";
      if (message.toLowerCase().includes('order')) {
        reply = "📦 You can manage orders from Dashboard → Orders section. Update shipping info and track deliveries there.";
      } else if (message.toLowerCase().includes('payment')) {
        reply = "💰 Payments are processed within 7-14 business days after delivery confirmation.";
      }
      setChatMessages(prev => [...prev, { sender: 'bot', text: reply }]);
    }, 1000);
  };

  const handleQuickReply = (type) => {
    const replies = {
      'registration': 'How can I register as a supplier?',
      'payment': 'Tell me about payments.',
      'orders': 'I have a question about orders.',
      'shipping': 'How do I track shipments?'
    };
    handleSendMessage(replies[type]);
  };

  const StatCard = ({ title, value, change, icon: Icon, color }) => (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-pink-100 hover:shadow-xl transition-all duration-300 hover:translate-y-1">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-pink-600 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-800">{value}</p>
          <p className={`text-sm ${change?.includes('+') ? 'text-green-500' : 'text-yellow-500'}`}>
            {change}
          </p>
        </div>
        <div className={`w-12 h-12 bg-gradient-to-r ${color} rounded-xl flex items-center justify-center`}>
          <Icon className="text-white" size={20} />
        </div>
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Orders"
          value="1,247"
          change="↗ +12% from last month"
          icon={ShoppingCart}
          color="from-pink-400 to-pink-600"
        />
        <StatCard
          title="Pending Orders"
          value="89"
          change="⚠ Needs attention"
          icon={Clock}
          color="from-yellow-400 to-orange-500"
        />
        <StatCard
          title="Completed Orders"
          value="1,158"
          change="✓ Great performance"
          icon={CheckCircle}
          color="from-green-400 to-green-600"
        />
        <StatCard
          title="Revenue"
          value="₹2,45,890"
          change="↗ +18% from last month"
          icon={TrendingUp}
          color="from-purple-400 to-purple-600"
        />
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-pink-100">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Orders</h3>
        <div className="space-y-4">
          {[
            { id: '#ORD-001', amount: '₹1,250', status: 'Pending', statusColor: 'bg-yellow-100 text-yellow-800' },
            { id: '#ORD-002', amount: '₹890', status: 'Completed', statusColor: 'bg-green-100 text-green-800' },
            { id: '#ORD-003', amount: '₹2,100', status: 'Cancelled', statusColor: 'bg-red-100 text-red-800' },
          ].map((order, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-pink-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-800">{order.id}</p>
                <p className="text-sm text-gray-600">{order.amount}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${order.statusColor}`}>
                {order.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderOrders = () => (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-pink-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Orders Management</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-pink-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-pink-600 uppercase tracking-wider">Order ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-pink-600 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-pink-600 uppercase tracking-wider">Buyer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-pink-600 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-pink-600 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-pink-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-pink-100">
            {[
              { id: '#ORD-001', date: '2024-01-15', buyer: 'John Doe', amount: '₹1,250', status: 'Pending', statusColor: 'bg-yellow-100 text-yellow-800' },
              { id: '#ORD-002', date: '2024-01-14', buyer: 'Jane Smith', amount: '₹890', status: 'Completed', statusColor: 'bg-green-100 text-green-800' },
            ].map((order, index) => (
              <tr key={index} className="hover:bg-pink-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.buyer}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.amount}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${order.statusColor}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button className="text-pink-600 hover:text-pink-900 transition-colors">
                    <Eye size={16} className="inline mr-1" />
                    View
                  </button>
                  <button className="text-green-600 hover:text-green-900 transition-colors">
                    Accept
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderProducts = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-800">Products</h2>
        <button 
          onClick={() => setShowProductModal(true)}
          className="bg-gradient-to-r from-pink-500 to-pink-600 text-white px-6 py-3 rounded-lg font-medium hover:from-pink-600 hover:to-pink-700 transition-all flex items-center space-x-2"
        >
          <Plus size={16} />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Products</p>
              <p className="text-2xl font-bold text-gray-800">247</p>
            </div>
            <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
              <span className="text-pink-600 text-xl">📦</span>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Low Stock</p>
              <p className="text-2xl font-bold text-orange-600">12</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <span className="text-orange-600 text-xl">⚠️</span>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Active Products</p>
              <p className="text-2xl font-bold text-green-600">235</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-green-600 text-xl">✅</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-2 relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-pink-400" />
            <input
              type="text"
              placeholder="Search by product name or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all"
            />
          </div>
          
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all"
          >
            <option value="">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Home">Home & Garden</option>
            <option value="Sports">Sports</option>
          </select>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all"
          >
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Low Stock">Low Stock</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-pink-50 border-b border-pink-100">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Product</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">SKU/ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Price</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Stock</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Category</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedProducts.map((product, index) => (
                <tr key={product.id} className="border-b border-pink-50 hover:bg-pink-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center text-xl">
                        {product.image}
                      </div>
                      <span className="font-medium text-gray-800">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600 font-mono">{product.sku}</td>
                  <td className="px-6 py-4 font-semibold text-gray-800">${product.price}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      product.stock > 20 ? 'bg-green-100 text-green-800' : 
                      product.stock > 0 ? 'bg-orange-100 text-orange-800' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{product.category}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      product.status === 'Active' ? 'bg-green-100 text-green-800' : 
                      product.status === 'Low Stock' ? 'bg-orange-100 text-orange-800' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEditProduct(product)}
                        className="bg-blue-500 text-white px-3 py-2 rounded-lg text-sm font-medium flex items-center space-x-1 hover:bg-blue-600 transition-colors"
                      >
                        <Edit size={14} />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="bg-red-500 text-white px-3 py-2 rounded-lg text-sm font-medium flex items-center space-x-1 hover:bg-red-600 transition-colors"
                      >
                        <Trash2 size={14} />
                        <span>Delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-6 py-4 border-t border-pink-100 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Showing {Math.min(filteredProducts.length, (currentPage - 1) * itemsPerPage + 1)} to {Math.min(filteredProducts.length, currentPage * itemsPerPage)} of {filteredProducts.length} products
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 border border-pink-200 rounded-lg text-gray-600 hover:bg-pink-50 transition-colors disabled:opacity-50"
            >
              Previous
            </button>
            <span className="px-3 py-2 bg-pink-500 text-white rounded-lg">{currentPage}</span>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-2 border border-pink-200 rounded-lg text-gray-600 hover:bg-pink-50 transition-colors disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPayments = () => (
    <div className="space-y-8">
      {/* Financial Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-2 bg-white rounded-xl p-8 shadow-lg border-l-4 border-cyan-500">
          <div className="flex justify-between items-start">
            <span className="text-xl font-semibold text-gray-500 uppercase tracking-wider">Total Balance</span>
            <CreditCard className="w-8 h-8 text-cyan-500" />
          </div>
          <div className="mt-4">
            <span className="text-5xl font-extrabold text-gray-800">₹ 8,50,000</span>
            <p className="text-sm text-gray-500 mt-2">All-time revenue generated on Qwipo.</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg">
          <span className="text-lg font-semibold text-gray-600">Pending Payments</span>
          <div className="mt-3">
            <span className="text-4xl font-bold text-red-600">₹ 1,20,000</span>
            <p className="text-sm text-gray-500 mt-2">Payments currently in T+7 cycle.</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg">
          <span className="text-lg font-semibold text-gray-600">Available to Withdraw</span>
          <div className="mt-3">
            <span className="text-4xl font-bold text-cyan-500">₹ 7,30,000</span>
            <p className="text-sm text-gray-500 mt-2">Ready for immediate payout.</p>
          </div>
        </div>
      </div>

      {/* Payout Request */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Request Payout</h3>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Payout Method</label>
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500">
                  <option value="">Select Method</option>
                  <option value="bank">Bank Transfer (Verified Account)</option>
                  <option value="upi">UPI (Instant - Max ₹2L)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Amount (₹)</label>
                <input
                  type="number"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                  placeholder="Enter Amount (Max ₹7,30,000)"
                  min="1000"
                  max="730000"
                />
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full md:w-auto px-10 py-3 bg-gradient-to-r from-cyan-500 to-teal-600 text-white font-semibold rounded-full hover:from-cyan-600 hover:to-teal-700 transition-all"
            >
              Securely Withdraw Funds
            </button>
          </form>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-orange-500">
          <h3 className="text-xl font-bold text-orange-600 mb-4">Payout Policy Tips 📋</h3>
          <ul className="space-y-3 text-sm text-gray-600">
            <li className="flex items-start">
              <span className="mr-2 text-orange-500 font-bold">●</span>
              <strong>T+1 Payouts:</strong> Funds are typically transferred within 1 business day of request confirmation.
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-orange-500 font-bold">●</span>
              <strong>Zero Fees</strong> on all transfers above ₹50,000. Check fee schedule for lower amounts.
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-orange-500 font-bold">●</span>
              <strong>Security:</strong> All transactions require a mandatory OTP verification on file.
            </li>
          </ul>
        </div>
      </div>

      {/* Payment History */}
      <div className="bg-white rounded-xl p-8 shadow-lg">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Payment History</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="border-b-2 border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                { date: '2025-09-25', id: 'QWO-89101', amount: '₹ 1,50,000', status: 'Completed', statusColor: 'bg-green-100 text-green-800' },
                { date: '2025-09-28', id: 'QWO-89102', amount: '₹ 2,20,000', status: 'Processing', statusColor: 'bg-yellow-100 text-yellow-800' },
                { date: '2025-09-20', id: 'QWO-89099', amount: '₹ 40,000', status: 'Failed', statusColor: 'bg-red-100 text-red-800' },
              ].map((payment, index) => (
                <tr key={index} className="hover:bg-blue-50 transition-colors text-sm">
                  <td className="px-4 py-4 whitespace-nowrap font-medium text-gray-800">{payment.date}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-cyan-500 font-bold">{payment.id}</td>
                  <td className="px-4 py-4 whitespace-nowrap font-semibold text-green-600">{payment.amount}</td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full ${payment.statusColor}`}>
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                    <button className="text-cyan-500 hover:text-cyan-700 transition-colors">Details</button>
                    <button className="text-gray-500 hover:text-gray-700 transition-colors">
                      <Download size={14} className="inline" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-800">Supplier Profile</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white border-opacity-30">
            <div className="text-center mb-6">
              <div className="relative w-28 h-28 mx-auto mb-4 border-4 border-white rounded-full shadow-lg overflow-hidden">
                <div className="w-full h-full bg-gradient-to-r from-pink-400 to-pink-600 flex items-center justify-center">
                  <User className="text-white" size={40} />
                </div>
                <span className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center text-white">
                  <CheckCircle size={16} />
                </span>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900">Tech Solutions Pro, LLC</h3>
              <p className="text-sm text-gray-500">John Smith, CEO</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center text-gray-700">
                <Mail className="w-5 h-5 mr-3 text-blue-500" />
                <span className="font-medium">support@techpro.com</span>
              </div>
              <div className="flex items-center text-gray-700">
                <CheckCircle className="w-5 h-5 mr-3 text-green-500" />
                <span className="font-medium text-green-600">KYC Verified & Approved</span>
              </div>
            </div>

            <button className="w-full mt-6 py-2 rounded-lg text-white font-semibold bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg">
              Update Profile Info
            </button>
          </div>

          {/* Profile Completion */}
          <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-2xl p-6 shadow-lg mt-6">
            <h4 className="text-lg font-semibold mb-3 text-blue-800">Profile Completion</h4>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Operational Readiness</span>
              <span className="text-lg font-bold text-green-600">75%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="h-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-teal-600" style={{width: '75%'}}></div>
            </div>
            <p className="text-xs text-gray-500 mt-2">Finish remaining steps to unlock Premium features.</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all cursor-pointer">
              <div className="text-5xl font-extrabold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">1,450</div>
              <p className="text-lg font-medium text-gray-700 mt-1">Total Orders</p>
              <p className="text-sm text-green-500 font-semibold mt-1 flex items-center justify-center">
                <TrendingUp size={16} className="mr-1" />
                +12% MoM
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all cursor-pointer">
              <div className="text-5xl font-extrabold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">₹ 4.5 Cr</div>
              <p className="text-lg font-medium text-gray-700 mt-1">Total Payments</p>
              <p className="text-sm text-gray-500 font-medium mt-1">Last Settlement: ₹8.5L</p>
            </div>

            <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all cursor-pointer">
              <div className="text-5xl font-extrabold text-yellow-500">4.7</div>
              <p className="text-lg font-medium text-gray-700 mt-1">Supplier Rating</p>
              <div className="flex items-center justify-center text-sm mt-1">
                <div className="flex text-yellow-500 mr-1">
                  {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="currentColor" />)}
                </div>
                <span className="text-gray-500">(320 Reviews)</span>
              </div>
            </div>
          </div>

          {/* Business Details */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h4 className="text-xl font-bold text-blue-800 mb-4 border-b pb-2 border-gray-100">Business Compliance Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-500">GST Identification Number</span>
                <span className="text-base font-medium">29ABCDX0001E1Z5</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-500">Supplier ID on Qwipo</span>
                <span className="text-base font-medium text-cyan-500">QW-SUP-7043</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderHelp = () => (
    <div className="space-y-12">
      <div className="text-center">
        <h2 className="text-5xl font-bold text-gray-800 mb-6">Supplier Help & Support</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Get quick answers to your questions about registration, orders, payments, and shipments. 
          We're here to help you succeed on the Qwipo platform.
        </p>
      </div>

      {/* FAQ Section */}
      <div className="space-y-4">
        <h3 className="text-3xl font-bold text-center text-gray-800 mb-8">Frequently Asked Questions</h3>
        {[
          {
            question: "How do I register as a supplier on Qwipo?",
            answer: "To register as a supplier, click 'Sign Up' on our homepage, select 'Supplier Account,' fill in your business details, upload required documents (business license, tax ID), and wait for verification. The process typically takes 2-3 business days."
          },
          {
            question: "When and how do I receive payments?",
            answer: "Payments are processed within 7-14 business days after successful delivery confirmation. You can choose between bank transfer, PayPal, or check. Set up your payment preferences in your supplier dashboard under 'Payment Settings.'"
          },
          {
            question: "How do I manage and fulfill orders?",
            answer: "Orders appear in your dashboard under 'Active Orders.' Click on each order to view details, confirm availability, update shipping information, and mark as shipped. You'll receive email notifications for new orders and can set up SMS alerts."
          },
        ].map((faq, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all">
            <div className="p-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-3">{faq.question}</h4>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Contact Options */}
      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-white rounded-xl p-8 text-center shadow-lg hover:shadow-xl transition-all">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <MessageCircle className="w-8 h-8 text-white" />
          </div>
          <h4 className="text-xl font-bold text-gray-800 mb-4">Live Chat</h4>
          <p className="text-gray-600 mb-6">Chat with our support team in real-time for immediate assistance.</p>
          <button 
            onClick={() => setShowChatbot(true)}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all"
          >
            Start Chat
          </button>
        </div>

        <div className="bg-white rounded-xl p-8 text-center shadow-lg hover:shadow-xl transition-all">
          <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <h4 className="text-xl font-bold text-gray-800 mb-4">Email Support</h4>
          <p className="text-gray-600 mb-6">Send us an email and we'll respond within 24 hours.</p>
          <a 
            href="mailto:support@qwipo.com" 
            className="inline-block w-full bg-gradient-to-r from-green-600 to-teal-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-green-700 hover:to-teal-700 transition-all"
          >
            Send Email
          </a>
        </div>

        <div className="bg-white rounded-xl p-8 text-center shadow-lg hover:shadow-xl transition-all">
          <div className="w-16 h-16 bg-gradient-to-r from-orange-600 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Phone className="w-8 h-8 text-white" />
          </div>
          <h4 className="text-xl font-bold text-gray-800 mb-4">Call Us</h4>
          <p className="text-gray-600 mb-6">Speak directly with our support team during business hours.</p>
          <a 
            href="tel:+1-800-QWIPO-HELP" 
            className="inline-block w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-orange-700 hover:to-red-700 transition-all"
          >
            Call Now
          </a>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch(activeSection) {
      case 'dashboard': return renderDashboard();
      case 'orders': return renderOrders();
      case 'products': return renderProducts();
      case 'payments': return renderPayments();
      case 'profile': return renderProfile();
      case 'help': return renderHelp();
      default: return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-2 border-pink-100 sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-pink-600 rounded-xl flex items-center justify-center">
              <Store className="text-white" size={20} />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Qwipo Supplier Panel
            </h1>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search orders, products..." 
                className="w-80 px-4 py-2 pl-10 bg-pink-50 border border-pink-200 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all"
              />
              <Search className="absolute left-3 top-3 text-pink-400" size={16} />
            </div>
            
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-pink-600 hover:bg-pink-50 rounded-full transition-colors"
              >
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-pink-500 rounded-full"></span>
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-3 w-80 bg-white shadow-lg rounded-xl border border-gray-200 z-50">
                  <div className="p-4 border-b font-bold text-gray-700">Notifications</div>
                  <ul className="divide-y divide-gray-100 max-h-60 overflow-y-auto">
                    <li className="p-4 hover:bg-gray-50 cursor-pointer">
                      <p className="text-sm font-medium">New Order #125</p>
                      <span className="text-xs text-gray-500">5 mins ago</span>
                    </li>
                    <li className="p-4 hover:bg-gray-50 cursor-pointer">
                      <p className="text-sm font-medium">Payment Received $250</p>
                      <span className="text-xs text-gray-500">10 mins ago</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>
            
            <div className="relative">
              <button 
                onClick={() => setShowProfile(!showProfile)}
                className="flex items-center space-x-2 p-2 hover:bg-pink-50 rounded-lg transition-colors"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-pink-600 rounded-full flex items-center justify-center">
                  <User className="text-white" size={16} />
                </div>
                <ChevronDown className="text-pink-600" size={16} />
              </button>
              
              {showProfile && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-pink-100 z-50">
                  <a href="#" className="flex items-center px-4 py-2 text-gray-700 hover:bg-pink-50 transition-colors">
                    <Settings size={16} className="mr-2" />
                    Settings
                  </a>
                  <a href="#" className="flex items-center px-4 py-2 text-gray-700 hover:bg-pink-50 transition-colors">
                    <LogOut size={16} className="mr-2" />
                    Logout
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-gradient-to-b from-pink-100 to-pink-200 min-h-screen shadow-lg">
          <nav className="p-4 space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className={`rounded-lg p-3 transition-all cursor-pointer ${
                    activeSection === item.id
                      ? 'bg-white bg-opacity-50 border-l-4 border-pink-500'
                      : 'hover:bg-white hover:bg-opacity-30'
                  }`}
                  onClick={() => setActiveSection(item.id)}
                >
                  <div className="flex items-center space-x-3 text-pink-700">
                    <Icon size={20} />
                    <span className={activeSection === item.id ? 'font-semibold' : ''}>{item.label}</span>
                  </div>
                </div>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>

      {/* Product Modal */}
      {showProductModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6 border-b border-pink-100 bg-gradient-to-r from-pink-50 to-white">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-800">
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </h3>
                <button 
                  onClick={() => {
                    setShowProductModal(false);
                    setEditingProduct(null);
                  }}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  <X size={24} />
                </button>
              </div>
            </div>
            
            <form onSubmit={handleProductSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                  <input 
                    type="text" 
                    required 
                    defaultValue={editingProduct?.name || ''}
                    className="w-full px-4 py-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">SKU/ID</label>
                  <input 
                    type="text" 
                    required 
                    defaultValue={editingProduct?.sku || ''}
                    className="w-full px-4 py-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price ($)</label>
                  <input 
                    type="number" 
                    step="0.01" 
                    required 
                    defaultValue={editingProduct?.price || ''}
                    className="w-full px-4 py-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Stock Quantity</label>
                  <input 
                    type="number" 
                    required 
                    defaultValue={editingProduct?.stock || ''}
                    className="w-full px-4 py-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select 
                    required 
                    defaultValue={editingProduct?.category || ''}
                    className="w-full px-4 py-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                  >
                    <option value="">Select Category</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Home">Home & Garden</option>
                    <option value="Sports">Sports</option>
                  </select>
                </div>
              </div>
              
              <div className="flex items-center justify-end space-x-4 pt-6 border-t border-pink-100">
                <button 
                  type="button" 
                  onClick={() => {
                    setShowProductModal(false);
                    setEditingProduct(null);
                  }}
                  className="px-6 py-3 border border-pink-200 text-gray-600 rounded-lg hover:bg-pink-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="bg-gradient-to-r from-pink-500 to-pink-600 text-white px-6 py-3 rounded-lg font-medium hover:from-pink-600 hover:to-pink-700 transition-all"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Chatbot */}
      <div className="fixed bottom-6 right-6 z-50">
        <button 
          onClick={() => setShowChatbot(!showChatbot)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110"
        >
          <MessageCircle size={24} />
        </button>

        {showChatbot && (
          <div className="absolute bottom-16 right-0 w-80 bg-white rounded-xl shadow-2xl border border-gray-200">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">Qwipo Assistant</h4>
                  <p className="text-xs opacity-90">Online now</p>
                </div>
                <button onClick={() => setShowChatbot(false)} className="text-white/80 hover:text-white">
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="h-64 overflow-y-auto p-4 space-y-3">
              {chatMessages.map((message, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.sender === 'user' ? 'bg-blue-600' : 'bg-gray-400'
                  }`}>
                    {message.sender === 'user' ? <User size={12} className="text-white" /> : <MessageCircle size={12} className="text-white" />}
                  </div>
                  <div className={`rounded-lg p-3 max-w-xs ${
                    message.sender === 'user' ? 'bg-blue-50' : 'bg-gray-100'
                  }`}>
                    <p className="text-sm text-gray-800">{message.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-gray-200">
              <div className="grid grid-cols-2 gap-2 mb-3">
                {['registration', 'payment', 'orders', 'shipping'].map((type) => (
                  <button
                    key={type}
                    onClick={() => handleQuickReply(type)}
                    className="text-xs bg-blue-50 text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-100 transition-colors capitalize"
                  >
                    {type === 'registration' ? 'Registration Help' :
                     type === 'payment' ? 'Payment Info' :
                     type === 'orders' ? 'Order Management' :
                     'Shipping Guide'}
                  </button>
                ))}
              </div>
              
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Type your message..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(chatInput)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={() => handleSendMessage(chatInput)}
                  className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-pink-100 py-6 mt-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600">© 2024 Qwipo. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-pink-600 hover:text-pink-800 transition-colors">Privacy Policy</a>
              <a href="#" className="text-pink-600 hover:text-pink-800 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default QwipoSupplierDashboard;