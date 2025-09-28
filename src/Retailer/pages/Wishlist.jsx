import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

function Wishlist({ wishlist, removeFromWishlist, addToCart }) {
  const [sortBy, setSortBy] = useState('added-desc');

  // Sort wishlist items
  const sortedWishlist = [...wishlist].sort((a, b) => {
    switch (sortBy) {
      case 'added-desc':
        return b.addedToWishlistAt - a.addedToWishlistAt;
      case 'added-asc':
        return a.addedToWishlistAt - b.addedToWishlistAt;
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const handleMoveAllToCart = () => {
    if (wishlist.length === 0) return;
    
    if (window.confirm('Move all items from wishlist to cart?')) {
      wishlist.forEach(item => {
        addToCart(item, 1);
        removeFromWishlist(item.id);
      });
      alert('All items moved to cart!');
    }
  };

  const handleClearWishlist = () => {
    if (window.confirm('Are you sure you want to clear your entire wishlist?')) {
      wishlist.forEach(item => removeFromWishlist(item.id));
    }
  };

  const totalWishlistValue = wishlist.reduce((sum, item) => sum + item.price, 0);
  const averagePrice = wishlist.length > 0 ? totalWishlistValue / wishlist.length : 0;

  if (wishlist.length === 0) {
    return (
      <div className="wishlist-page">
        <div className="page-container">
          <div className="empty-state">
            <div className="empty-state-icon">❤️</div>
            <h2>Your wishlist is empty</h2>
            <p>Save products you love for later by adding them to your wishlist</p>
            <Link to="/retailer/search" className="btn btn-primary">
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <div className="page-container">
        <div className="page-header">
          <h1>My Wishlist ❤️</h1>
          <p>{wishlist.length} item{wishlist.length > 1 ? 's' : ''} saved for later</p>
        </div>

        {/* Wishlist Stats */}
        <div className="wishlist-stats">
          <div className="stat-card">
            <div className="stat-number">{wishlist.length}</div>
            <div className="stat-label">Saved Items</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">₹{totalWishlistValue.toLocaleString()}</div>
            <div className="stat-label">Total Value</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">₹{Math.round(averagePrice).toLocaleString()}</div>
            <div className="stat-label">Average Price</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">
              {Math.round(wishlist.reduce((sum, item) => {
                const discount = item.originalPrice ? 
                  ((item.originalPrice - item.price) / item.originalPrice) * 100 : 0;
                return sum + discount;
              }, 0) / wishlist.length)}%
            </div>
            <div className="stat-label">Avg Discount</div>
          </div>
        </div>

        {/* Wishlist Controls */}
        <div className="wishlist-controls">
          <div className="controls-left">
            <label>Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="form-select"
            >
              <option value="added-desc">Recently Added</option>
              <option value="added-asc">Oldest First</option>
              <option value="price-low">Price (Low to High)</option>
              <option value="price-high">Price (High to Low)</option>
              <option value="name">Name (A-Z)</option>
            </select>
          </div>

          <div className="controls-right">
            <button 
              className="btn btn-outline"
              onClick={handleMoveAllToCart}
            >
              🛒 Move All to Cart
            </button>
            <button 
              className="btn btn-outline"
              onClick={handleClearWishlist}
              style={{color: '#e74c3c', borderColor: '#e74c3c'}}
            >
              🗑️ Clear Wishlist
            </button>
          </div>
        </div>

        {/* Price Drop Alerts */}
        <div className="price-alerts">
          <div className="alert-info">
            🔔 <strong>Price Drop Alert:</strong> We'll notify you when prices drop on your wishlist items!
          </div>
        </div>

        {/* Wishlist Items */}
        <div className="wishlist-items">
          <div className="product-grid">
            {sortedWishlist.map(product => (
              <div key={product.id} className="wishlist-item">
                <ProductCard
                  product={product}
                  addToCart={addToCart}
                  addToWishlist={() => {}} // Already in wishlist
                  isInCart={false}
                  isInWishlist={true}
                />
                
                <div className="wishlist-item-actions">
                  <button 
                    className="btn btn-outline btn-small"
                    onClick={() => addToCart(product, 1)}
                  >
                    🛒 Add to Cart
                  </button>
                  
                  <button 
                    className="btn btn-outline btn-small"
                    onClick={() => removeFromWishlist(product.id)}
                    style={{color: '#e74c3c', borderColor: '#e74c3c'}}
                  >
                    ❌ Remove
                  </button>
                </div>

                {/* Price History Indicator */}
                {product.originalPrice && product.originalPrice > product.price && (
                  <div className="price-drop-badge">
                    📉 Price Dropped by ₹{product.originalPrice - product.price}!
                  </div>
                )}

                {/* Stock Status */}
                {!product.inStock && (
                  <div className="stock-alert">
                    ⚠️ Out of Stock - We'll notify when available
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Wishlist Recommendations */}
        <div className="wishlist-recommendations">
          <h3>You might also like</h3>
          <p>Based on items in your wishlist</p>
          
          <div className="recommendation-cards">
            <div className="recommendation-card">
              <div className="rec-icon">💡</div>
              <div className="rec-content">
                <h4>Similar Products</h4>
                <p>Discover products similar to your wishlist items</p>
                <Link to="/search?similar=true" className="btn btn-outline btn-small">
                  Explore Similar
                </Link>
              </div>
            </div>

            <div className="recommendation-card">
              <div className="rec-icon">🔥</div>
              <div className="rec-content">
                <h4>Trending Now</h4>
                <p>Popular products in your categories</p>
                <Link to="/search?trending=true" className="btn btn-outline btn-small">
                  View Trending
                </Link>
              </div>
            </div>

            <div className="recommendation-card">
              <div className="rec-icon">💰</div>
              <div className="rec-content">
                <h4>Best Deals</h4>
                <p>Great discounts on products you love</p>
                <Link to="/search?deals=true" className="btn btn-outline btn-small">
                  Find Deals
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Wishlist Tips */}
        <div className="wishlist-tips">
          <h3>💡 Wishlist Tips</h3>
          <div className="tips-grid">
            <div className="tip-card">
              <div className="tip-icon">🔔</div>
              <div className="tip-content">
                <h4>Price Alerts</h4>
                <p>Get notified when prices drop on your saved items</p>
              </div>
            </div>

            <div className="tip-card">
              <div className="tip-icon">📱</div>
              <div className="tip-content">
                <h4>Quick Add</h4>
                <p>Tap the heart icon on any product to save it instantly</p>
              </div>
            </div>

            <div className="tip-card">
              <div className="tip-icon">🛒</div>
              <div className="tip-content">
                <h4>Bulk Actions</h4>
                <p>Move multiple items to cart at once for faster checkout</p>
              </div>
            </div>

            <div className="tip-card">
              <div className="tip-icon">🎯</div>
              <div className="tip-content">
                <h4>Stock Alerts</h4>
                <p>We'll notify you when out-of-stock items are available</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Wishlist;