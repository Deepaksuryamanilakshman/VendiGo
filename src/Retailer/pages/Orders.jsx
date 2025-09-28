import React, { useState } from 'react';

function Orders({ orders, addToCart }) {
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('date-desc');

  // Filter orders by status
  const filteredOrders = orders.filter(order => {
    if (filterStatus === 'all') return true;
    return order.status.toLowerCase() === filterStatus.toLowerCase();
  });

  // Sort orders
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    switch (sortBy) {
      case 'date-desc':
        return new Date(b.orderDate) - new Date(a.orderDate);
      case 'date-asc':
        return new Date(a.orderDate) - new Date(b.orderDate);
      case 'amount-desc':
        return b.totalAmount - a.totalAmount;
      case 'amount-asc':
        return a.totalAmount - b.totalAmount;
      default:
        return 0;
    }
  });

  const handleReorder = (order) => {
    order.items.forEach(item => {
      addToCart(item, item.quantity);
    });
    alert('Items added to cart successfully!');
  };

  const downloadInvoice = (orderId) => {
    // In a real app, this would generate and download an invoice
    alert(`Downloading invoice for order #${orderId}`);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'processing':
        return 'status-processing';
      case 'shipped':
        return 'status-shipped';
      case 'delivered':
        return 'status-delivered';
      case 'cancelled':
        return 'status-cancelled';
      default:
        return 'status-processing';
    }
  };

  const orderStatuses = ['all', 'processing', 'shipped', 'delivered', 'cancelled'];

  return (
    <div className="orders-page">
      <div className="page-container">
        <div className="page-header">
          <h1>My Orders</h1>
          <p>Track and manage all your orders</p>
        </div>

        {/* Filters and Sort */}
        <div className="orders-controls">
          <div className="order-filters">
            <label>Filter by Status:</label>
            <div className="status-tabs">
              {orderStatuses.map(status => (
                <button
                  key={status}
                  className={`status-tab ${filterStatus === status ? 'active' : ''}`}
                  onClick={() => setFilterStatus(status)}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                  {status !== 'all' && (
                    <span className="count">
                      ({orders.filter(o => status === 'all' || o.status.toLowerCase() === status).length})
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="order-sort">
            <label>Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="form-select"
            >
              <option value="date-desc">Date (Newest First)</option>
              <option value="date-asc">Date (Oldest First)</option>
              <option value="amount-desc">Amount (High to Low)</option>
              <option value="amount-asc">Amount (Low to High)</option>
            </select>
          </div>
        </div>

        {/* Orders List */}
        {sortedOrders.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📦</div>
            <h3>No orders found</h3>
            <p>
              {filterStatus === 'all' 
                ? "You haven't placed any orders yet"
                : `No ${filterStatus} orders found`
              }
            </p>
            <button 
              className="btn btn-primary"
              onClick={() => window.location.href = '/search'}
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="orders-list">
            {sortedOrders.map(order => (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <div className="order-info">
                    <div className="order-id">Order #{order.id}</div>
                    <div className="order-date">
                      Placed on {new Date(order.orderDate).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </div>
                  </div>
                  <div className={`order-status ${getStatusColor(order.status)}`}>
                    {order.status}
                  </div>
                </div>

                <div className="order-items">
                  {order.items.map((item, index) => (
                    <div key={index} className="order-item">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="order-item-image"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/80x80?text=No+Image';
                        }}
                      />
                      <div className="order-item-details">
                        <div className="order-item-name">{item.name}</div>
                        <div className="order-item-meta">
                          <span className="item-quantity">Qty: {item.quantity}</span>
                          <span className="item-unit">{item.unit}</span>
                        </div>
                        <div className="order-item-price">₹{item.price} each</div>
                      </div>
                      <div className="order-item-total">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="order-summary">
                  <div className="summary-details">
                    <div className="summary-row">
                      <span>Items Total:</span>
                      <span>₹{order.totalAmount}</span>
                    </div>
                    <div className="summary-row">
                      <span>Delivery:</span>
                      <span>Free</span>
                    </div>
                    <div className="summary-row order-total">
                      <span>Total Amount:</span>
                      <span>₹{order.totalAmount}</span>
                    </div>
                  </div>
                </div>

                <div className="order-details">
                  <div className="delivery-info">
                    <h4>Delivery Information</h4>
                    <p>{order.deliveryAddress}</p>
                    <div className="payment-method">
                      <strong>Payment:</strong> {order.paymentMethod}
                    </div>
                  </div>
                </div>

                <div className="order-actions">
                  <button 
                    className="btn btn-outline"
                    onClick={() => handleReorder(order)}
                  >
                    🔄 Reorder
                  </button>
                  
                  <button 
                    className="btn btn-outline"
                    onClick={() => downloadInvoice(order.id)}
                  >
                    📄 Download Invoice
                  </button>

                  {order.status === 'Delivered' && (
                    <button className="btn btn-outline">
                      ⭐ Rate Products
                    </button>
                  )}

                  {(order.status === 'Processing' || order.status === 'Shipped') && (
                    <button className="btn btn-secondary">
                      ❌ Cancel Order
                    </button>
                  )}
                </div>

                {/* Order Timeline for active orders */}
                {(order.status === 'Processing' || order.status === 'Shipped') && (
                  <div className="order-timeline">
                    <h4>Order Progress</h4>
                    <div className="timeline">
                      <div className="timeline-item completed">
                        <div className="timeline-icon">✓</div>
                        <div className="timeline-content">
                          <div className="timeline-title">Order Placed</div>
                          <div className="timeline-time">
                            {new Date(order.orderDate).toLocaleString()}
                          </div>
                        </div>
                      </div>
                      
                      <div className={`timeline-item ${order.status !== 'Processing' ? 'completed' : 'active'}`}>
                        <div className="timeline-icon">
                          {order.status !== 'Processing' ? '✓' : '⏳'}
                        </div>
                        <div className="timeline-content">
                          <div className="timeline-title">Processing</div>
                          <div className="timeline-time">
                            {order.status !== 'Processing' ? 'Completed' : 'In Progress'}
                          </div>
                        </div>
                      </div>
                      
                      <div className={`timeline-item ${order.status === 'Shipped' || order.status === 'Delivered' ? 'completed' : ''}`}>
                        <div className="timeline-icon">
                          {order.status === 'Shipped' || order.status === 'Delivered' ? '✓' : '○'}
                        </div>
                        <div className="timeline-content">
                          <div className="timeline-title">Shipped</div>
                          <div className="timeline-time">
                            {order.status === 'Shipped' || order.status === 'Delivered' ? 'In Transit' : 'Pending'}
                          </div>
                        </div>
                      </div>
                      
                      <div className={`timeline-item ${order.status === 'Delivered' ? 'completed' : ''}`}>
                        <div className="timeline-icon">
                          {order.status === 'Delivered' ? '✓' : '○'}
                        </div>
                        <div className="timeline-content">
                          <div className="timeline-title">Delivered</div>
                          <div className="timeline-time">
                            {order.status === 'Delivered' ? 'Completed' : 'Expected in 2-3 days'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;