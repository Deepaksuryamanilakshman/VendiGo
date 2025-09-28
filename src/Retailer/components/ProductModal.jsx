import React, { useState } from 'react';

function ProductModal({ product, onClose, addToCart, addToWishlist, isInCart, isInWishlist }) {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleAddToWishlist = () => {
    addToWishlist(product);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push('⭐');
    }
    if (hasHalfStar) {
      stars.push('⭐');
    }
    
    return stars.join('');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{product.name}</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-body">
          <img 
            src={product.image} 
            alt={product.name}
            className="product-modal-image"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
            }}
          />
          
          <div className="product-details">
            <div className="product-category-badge">
              <span className="category">{product.category}</span>
              <span className="subcategory">• {product.subcategory}</span>
            </div>
            
            <div className="product-price">
              <span className="current-price">₹{product.price}</span>
              {product.originalPrice && product.originalPrice > product.price && (
                <>
                  <span className="original-price">₹{product.originalPrice}</span>
                  <span className="discount-badge">{product.discount}% OFF</span>
                </>
              )}
              <span className="product-unit">per {product.unit}</span>
            </div>
            
            <div className="product-rating">
              <span className="stars">{renderStars(product.rating)}</span>
              <span className="rating-text">{product.rating}</span>
              <span className="rating-count">({product.reviews} reviews)</span>
            </div>
            
            <div className="product-brand">
              <strong>Brand:</strong> {product.brand}
            </div>
            
            <div className="product-description">
              <h3>Description</h3>
              <p>{product.description}</p>
            </div>
            
            <div className="product-business-types">
              <h3>Suitable for Business Types:</h3>
              <div className="business-type-tags">
                {product.businessTypes.map((type, index) => (
                  <span key={index} className="business-type-tag">{type}</span>
                ))}
              </div>
            </div>
            
            <div className="modal-actions">
              <button 
                className={`btn ${isInWishlist ? 'btn-secondary' : 'btn-outline'}`}
                onClick={handleAddToWishlist}
              >
                {isInWishlist ? '❤️ In Wishlist' : '🤍 Add to Wishlist'}
              </button>
              
              <div className="quantity-section">
                <label>Quantity:</label>
                <div className="quantity-controls">
                  <button 
                    type="button"
                    className="quantity-btn"
                    onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  >
                    -
                  </button>
                  <input 
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="quantity-input"
                  />
                  <button 
                    type="button"
                    className="quantity-btn"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              
              <button 
                className="btn btn-primary"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                {!product.inStock ? 'Out of Stock' : isInCart ? 'Update Cart' : 'Add to Cart'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductModal;