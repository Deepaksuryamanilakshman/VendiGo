import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { 
  sampleProducts, 
  getProductsByBusinessType, 
  categories, 
  festivalOffers 
} from '../data/sampleProducts';

function Dashboard({ user, cart, wishlist, orders, addToCart, addToWishlist }) {
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [recentlyViewedProducts, setRecentlyViewedProducts] = useState([]);
  const [currentFestivals, setCurrentFestivals] = useState([]);

  useEffect(() => {
    // Get products suitable for user's business type
    const businessProducts = getProductsByBusinessType(user.businessType);
    setRecommendedProducts(businessProducts.slice(0, 8));
    
    // Load recently viewed products from localStorage
    const recentlyViewed = JSON.parse(localStorage.getItem('recently_viewed') || '[]');
    const recentProducts = recentlyViewed
      .map(id => sampleProducts.find(p => p.id === id))
      .filter(Boolean)
      .slice(0, 6);
    setRecentlyViewedProducts(recentProducts);

    // Check for active festivals (demo: show festivals only on certain dates)
    const today = new Date();
    const activeFestivals = festivalOffers.filter(festival => {
      const validTill = new Date(festival.validTill);
      // For demo, we'll show festivals if it's close to the valid date
      const daysUntilFestival = Math.ceil((validTill - today) / (1000 * 60 * 60 * 24));
      return daysUntilFestival > 0 && daysUntilFestival < 30;
    });
    setCurrentFestivals(activeFestivals);
  }, [user.businessType]);

  const totalOrderValue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
  const pendingOrders = orders.filter(order => order.status === 'Processing').length;

  const businessCategories = categories[user.businessType] || Object.keys(categories).slice(0, 6);

  const isInCart = (productId) => cart.some(item => item.id === productId);
  const isInWishlist = (productId) => wishlist.some(item => item.id === productId);

  const recentOrders = orders.slice(0, 3);

  return (
    <div className="dashboard">
      {/* Hero Section */}
      <div className="hero-section">
        <h1 style={{color:"#fff"}}>Welcome back, {user.name.split(' ')[0]}! 👋</h1>
        <p>Manage your {user.businessType.toLowerCase()} inventory with ease</p>
        <div className="business-type-badge">{user.businessType}</div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">{orders.length}</div>
          <div className="stat-label">Total Orders</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">₹{totalOrderValue.toLocaleString()}</div>
          <div className="stat-label">Order Value</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{cart.length}</div>
          <div className="stat-label">Cart Items</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{user.loyaltyPoints}</div>
          <div className="stat-label">Loyalty Points</div>
        </div>
      </div>

      {/* Festival Banners - Only show during festival season */}
      {currentFestivals.length > 0 && (
        <div className="section">
          <h2 className="section-title">🎉 Festival Special Offers</h2>
          <div className="festival-offers-grid">
            {currentFestivals.map(festival => (
              <div key={festival.id} className="festival-banner">
                <h3>{festival.title}</h3>
                <p>{festival.description}</p>
                <div className="festival-price">
                  <span className="offer-price">₹{festival.offerPrice}</span>
                  <span className="original-price">₹{festival.originalPrice}</span>
                  <span className="discount-badge">{festival.discount}% OFF</span>
                </div>
                <Link to="/retailer/festival-packs" className="btn btn-secondary">
                  View Festival Packs
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="section">
        <h2 className="section-title">🚀 Quick Actions</h2>
        <div className="quick-actions-grid">
          <Link to="/retailer/search" className="action-card">
            <div className="action-icon">🔍</div>
            <div className="action-name">Search Products</div>
          </Link>
          <Link to="/retailer/orders" className="action-card">
            <div className="action-icon">📋</div>
            <div className="action-name">My Orders</div>
          </Link>
          <Link to="/retailer/cart" className="action-card">
            <div className="action-icon">🛒</div>
            <div className="action-name">View Cart ({cart.length})</div>
          </Link>
          <Link to="/retailer/rewards" className="action-card">
            <div className="action-icon">🎁</div>
            <div className="action-name">Rewards</div>
          </Link>
        </div>
      </div>

      {/* Recent Orders */}
      {recentOrders.length > 0 && (
        <div className="section">
          <div className="section-header">
            <h2 className="section-title">📦 Recent Orders</h2>
            <Link to="/retailer/orders" className="view-all-link">View All</Link>
          </div>
          <div className="recent-orders-grid">
            {recentOrders.map(order => (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <div>
                    <div className="order-id">Order #{order.id}</div>
                    <div className="order-date">
                      {new Date(order.orderDate).toLocaleDateString()}
                    </div>
                  </div>
                  <div className={`order-status status-${order.status.toLowerCase()}`}>
                    {order.status}
                  </div>
                </div>
                
                <div className="order-items">
                  {order.items.slice(0, 3).map((item, index) => (
                    <div key={index} className="order-item">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="order-item-image"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/40x40?text=No+Image';
                        }}
                      />
                      <div className="order-item-info">
                        <div className="order-item-name">{item.name}</div>
                        <div className="order-item-quantity">Qty: {item.quantity}</div>
                      </div>
                    </div>
                  ))}
                  {order.items.length > 3 && (
                    <div className="more-items">+{order.items.length - 3} more</div>
                  )}
                </div>
                
                <div className="order-total">Total: ₹{order.totalAmount}</div>
                
                <div className="order-actions">
                  <button 
                    className="btn btn-outline btn-small"
                    onClick={() => {
                      order.items.forEach(item => addToCart(item, item.quantity));
                    }}
                  >
                    Reorder
                  </button>
                  <Link 
                    to={`/retailer/orders`}
                    className="btn btn-primary btn-small"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recently Viewed */}
      {recentlyViewedProducts.length > 0 && (
        <div className="section">
          <h2 className="section-title">👀 Recently Viewed</h2>
          <div className="product-grid">
            {recentlyViewedProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={addToCart}
                addToWishlist={addToWishlist}
                isInCart={isInCart(product.id)}
                isInWishlist={isInWishlist(product.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Categories for Business Type */}
      <div className="section">
        <h2 className="section-title">
          📂 Categories for {user.businessType}
        </h2>
        <div className="category-grid">
          {businessCategories.map((category, index) => {
            const categoryProducts = sampleProducts.filter(p => p.category === category);
            return (
              <Link 
                key={index}
                to={`/retailer/search?category=${encodeURIComponent(category)}`}
                className="category-card"
              >
                <div className="category-icon">
                  {getCategoryIcon(category)}
                </div>
                <div className="category-name">{category}</div>
                <div className="category-count">{categoryProducts.length} products</div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recommended Products */}
      <div className="section">
        <h2 className="section-title">
          💡 Recommended for You
          <div className="section-subtitle">Based on your business type and purchase history</div>
        </h2>
        <div className="product-grid">
          {recommendedProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
              addToWishlist={addToWishlist}
              isInCart={isInCart(product.id)}
              isInWishlist={isInWishlist(product.id)}
            />
          ))}
        </div>
        <div className="text-center mt-3">
          <Link to="/retailer/search" className="btn btn-primary">
            View All Products
          </Link>
        </div>
      </div>
    </div>
  );
}

// Helper function to get category icons
function getCategoryIcon(category) {
  const icons = {
    'Food & Beverages': '🍽️',
    'Personal Care': '🧴',
    'Household': '🏠',
    'Clothing & Fashion': '👕',
    'Electronics': '📱',
    'Health & Wellness': '💊',
    'Stationery & Books': '📚',
    'Baby & Kids': '🍼',
    'Rice & Grains': '🌾',
    'Pulses & Lentils': '🥜',
    'Oil & Ghee': '🛢️',
    'Spices & Masalas': '🌶️',
    'Tea & Coffee': '☕',
    'Snacks & Namkeen': '🥨',
    'Beverages': '🥤',
    'Dairy Products': '🥛',
    'Soaps & Body Wash': '🧼',
    'Shampoo & Hair Care': '🧴',
    'Oral Care': '🦷',
    'Detergents': '🧽',
    'Kitchen Utensils': '🍴',
    'Mobile Accessories': '📱',
    'Home Appliances': '🏠',
    'Medicines': '💊'
  };
  
  return icons[category] || '📦';
}

export default Dashboard;