import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Cart({ cart, updateQuantity, removeFromCart, placeOrder }) {
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutData, setCheckoutData] = useState({
    address: '',
    paymentMethod: 'cod',
    notes: ''
  });

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryCharge = subtotal > 500 ? 0 : 50;
  const tax = Math.round(subtotal * 0.05); // 5% tax
  const total = subtotal + deliveryCharge + tax;

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(itemId);
    } else {
      updateQuantity(itemId, newQuantity);
    }
  };

  const handleCheckout = () => {
    if (!checkoutData.address.trim()) {
      alert('Please enter delivery address');
      return;
    }

    placeOrder({
      ...checkoutData,
      subtotal,
      deliveryCharge,
      tax,
      totalAmount: total
    });

    alert('Order placed successfully!');
    setShowCheckout(false);
  };

  const recommendedProducts = [
    { id: 'rec1', name: 'Complete your order', items: ['Rice', 'Dal', 'Oil'] },
    { id: 'rec2', name: 'Frequently bought together', items: ['Soap', 'Shampoo'] }
  ];

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <div className="page-container">
          <div className="empty-state">
            <div className="empty-state-icon">🛒</div>
            <h2>Your cart is empty</h2>
            <p>Add some products to your cart to continue shopping</p>
            <Link to="/search" className="btn btn-primary">
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="page-container">
        <div className="page-header">
          <h1>Shopping Cart</h1>
          <p>{cart.length} item{cart.length > 1 ? 's' : ''} in your cart</p>
        </div>

        <div className="cart-container">
          <div className="cart-items">
            <div className="cart-header">
              <h3>Cart Items</h3>
              <button 
                className="btn btn-outline btn-small"
                onClick={() => {
                  if (window.confirm('Are you sure you want to clear the cart?')) {
                    cart.forEach(item => removeFromCart(item.id));
                  }
                }}
              >
                Clear Cart
              </button>
            </div>

            {cart.map(item => (
              <div key={item.id} className="cart-item">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="cart-item-image"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/80x80?text=No+Image';
                  }}
                />
                
                <div className="cart-item-info">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-category">{item.subcategory}</div>
                  <div className="cart-item-unit">{item.unit}</div>
                  <div className="cart-item-price">₹{item.price} per unit</div>
                </div>

                <div className="cart-item-controls">
                  <div className="quantity-controls">
                    <button 
                      className="quantity-btn"
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <input 
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                      className="quantity-input"
                    />
                    <button 
                      className="quantity-btn"
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  
                  <div className="item-total">
                    ₹{(item.price * item.quantity).toLocaleString()}
                  </div>
                  
                  <button 
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id)}
                    title="Remove item"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}

            {/* Bulk Actions */}
            <div className="bulk-actions">
              <div className="bulk-discount">
                💡 <strong>Bulk Discount:</strong> Order ₹1000+ and get 5% extra discount!
                {subtotal >= 1000 && <span className="discount-applied">✅ Discount Applied!</span>}
              </div>
            </div>

            {/* Recommended Add-ons */}
            <div className="cart-recommendations">
              <h4>Complete Your Order</h4>
              <div className="recommendations-grid">
                {recommendedProducts.map(rec => (
                  <div key={rec.id} className="recommendation-card">
                    <h5>{rec.name}</h5>
                    <div className="rec-items">
                      {rec.items.join(', ')}
                    </div>
                    <button className="btn btn-outline btn-small">
                      Add Bundle
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Cart Summary */}
          <div className="cart-summary">
            <h3>Order Summary</h3>
            
            <div className="summary-section">
              <div className="summary-row">
                <span>Subtotal ({cart.length} items)</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              
              <div className="summary-row">
                <span>Delivery Charges</span>
                <span>
                  {deliveryCharge === 0 ? (
                    <span className="free-delivery">FREE</span>
                  ) : (
                    `₹${deliveryCharge}`
                  )}
                </span>
              </div>
              
              <div className="summary-row">
                <span>Tax (5%)</span>
                <span>₹{tax}</span>
              </div>
              
              {subtotal >= 1000 && (
                <div className="summary-row discount-row">
                  <span>Bulk Discount (5%)</span>
                  <span>-₹{Math.round(subtotal * 0.05)}</span>
                </div>
              )}
              
              <div className="summary-row summary-total">
                <span>Total Amount</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
            </div>

            <div className="summary-section">
              <div className="delivery-info">
                <div className="delivery-text">
                  🚚 {deliveryCharge === 0 ? 'Free delivery' : 'Delivery charges apply'}
                </div>
                <div className="delivery-time">
                  📅 Expected delivery: 2-3 business days
                </div>
              </div>
            </div>

            <div className="checkout-actions">
              <button 
                className="btn btn-primary w-full"
                onClick={() => setShowCheckout(true)}
              >
                Proceed to Checkout
              </button>
              
              <Link to="/search" className="btn btn-outline w-full">
                Continue Shopping
              </Link>
            </div>

            {/* Savings Summary */}
            <div className="savings-summary">
              <div className="savings-title">Your Savings</div>
              <div className="savings-amount">
                ₹{cart.reduce((sum, item) => 
                  sum + ((item.originalPrice || item.price) - item.price) * item.quantity, 0
                )} saved on this order
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">Checkout</h3>
              <button 
                className="modal-close"
                onClick={() => setShowCheckout(false)}
              >
                ×
              </button>
            </div>
            
            <div className="modal-body">
              <div className="checkout-form">
                <div className="form-group">
                  <label className="form-label">Delivery Address *</label>
                  <textarea
                    placeholder="Enter your complete delivery address"
                    value={checkoutData.address}
                    onChange={(e) => setCheckoutData({...checkoutData, address: e.target.value})}
                    className="form-input"
                    rows="3"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Payment Method</label>
                  <select
                    value={checkoutData.paymentMethod}
                    onChange={(e) => setCheckoutData({...checkoutData, paymentMethod: e.target.value})}
                    className="form-select"
                  >
                    <option value="cod">Cash on Delivery</option>
                    <option value="online">Online Payment</option>
                    <option value="credit">Credit Account</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label className="form-label">Order Notes (Optional)</label>
                  <textarea
                    placeholder="Any special instructions for delivery"
                    value={checkoutData.notes}
                    onChange={(e) => setCheckoutData({...checkoutData, notes: e.target.value})}
                    className="form-input"
                    rows="2"
                  />
                </div>
                
                <div className="checkout-summary">
                  <h4>Order Summary</h4>
                  <div className="summary-row">
                    <span>Total Items:</span>
                    <span>{cart.length}</span>
                  </div>
                  <div className="summary-row">
                    <span>Total Amount:</span>
                    <span>₹{total.toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="checkout-actions">
                  <button 
                    className="btn btn-primary w-full"
                    onClick={handleCheckout}
                  >
                    Place Order
                  </button>
                  <button 
                    className="btn btn-outline w-full"
                    onClick={() => setShowCheckout(false)}
                  >
                    Back to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;