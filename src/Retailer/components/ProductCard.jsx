import React, { useState } from 'react';
import ProductModal from './ProductModal';

function ProductCard({ product, addToCart, addToWishlist, isInCart, isInWishlist }) {
  const [showModal, setShowModal] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, quantity);
  };

  const handleAddToWishlist = (e) => {
    e.stopPropagation();
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
    <>
      <div className="product-card" onClick={() => setShowModal(true)}>
        <img 
          src={product.image} 
          alt={product.name}
          className="product-image"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/250x200?text=No+Image';
          }}
        />
        
        <div className="product-info">
          <div className="product-name">{product.name}</div>
          <div className="product-category">{product.subcategory}</div>
          
          <div className="product-price">
            <span className="current-price">₹{product.price}</span>
            {product.originalPrice && product.originalPrice > product.price && (
              <>
                <span className="original-price">₹{product.originalPrice}</span>
                <span className="discount-badge">{product.discount}% OFF</span>
              </>
            )}
          </div>
          
          <div className="product-rating">
            <span className="stars">{renderStars(product.rating)}</span>
            <span className="rating-count">({product.reviews})</span>
          </div>
          
          <div className="product-unit">{product.unit}</div>
          
          <div className="product-actions">
            <button 
              className={`btn ${isInWishlist ? 'btn-primary' : 'btn-outline'} btn-small btn-icon`}
              onClick={handleAddToWishlist}
              title={isInWishlist ? 'In Wishlist' : 'Add to Wishlist'}
            >
              {isInWishlist ? '❤️' : '🤍'}
            </button>
            
            <div className="quantity-controls">
              <button 
                type="button"
                className="quantity-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  if (quantity > 1) setQuantity(quantity - 1);
                }}
              >
                -
              </button>
              <input 
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="quantity-input"
                onClick={(e) => e.stopPropagation()}
              />
              <button 
                type="button"
                className="quantity-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setQuantity(quantity + 1);
                }}
              >
                +
              </button>
            </div>
            
            <button 
              className={`btn ${isInCart ? 'btn-secondary' : 'btn-primary'} btn-small`}
              onClick={handleAddToCart}
            >
              {isInCart ? 'Update Cart' : 'Add to Cart'}
            </button>
          </div>
          
          {!product.inStock && (
            <div className="out-of-stock-badge">Out of Stock</div>
          )}
        </div>
      </div>
      
      {showModal && (
        <ProductModal 
          product={product}
          onClose={() => setShowModal(false)}
          addToCart={addToCart}
          addToWishlist={addToWishlist}
          isInCart={isInCart}
          isInWishlist={isInWishlist}
        />
      )}
    </>
  );
}

export default ProductCard;