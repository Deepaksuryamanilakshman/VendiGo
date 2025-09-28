import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { searchProducts, categories, sampleProducts } from '../data/sampleProducts';

function Search({ addToCart, addToWishlist, cart, wishlist }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    priceRange: [0, 10000],
    rating: 0,
    inStock: false,
    sortBy: 'name'
  });
  const [loading, setLoading] = useState(false);

  const query = searchParams.get('q') || '';
  const categoryParam = searchParams.get('category') || '';

  useEffect(() => {
    setLoading(true);
    
    // Get search results
    let results = [];
    if (query) {
      results = searchProducts(query);
    } else if (categoryParam) {
      results = sampleProducts.filter(p => p.category === categoryParam);
    } else {
      results = sampleProducts;
    }
    
    setProducts(results);
    setFilteredProducts(results);
    setLoading(false);

    // Update filters if category is specified
    if (categoryParam) {
      setFilters(prev => ({ ...prev, category: categoryParam }));
    }
  }, [query, categoryParam]);

  useEffect(() => {
    // Apply filters
    let filtered = products;

    // Category filter
    if (filters.category) {
      filtered = filtered.filter(p => p.category === filters.category);
    }

    // Price range filter
    filtered = filtered.filter(p => 
      p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );

    // Rating filter
    if (filters.rating > 0) {
      filtered = filtered.filter(p => p.rating >= filters.rating);
    }

    // Stock filter
    if (filters.inStock) {
      filtered = filtered.filter(p => p.inStock);
    }

    // Sorting
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'discount':
          return b.discount - a.discount;
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(filtered);
  }, [products, filters]);

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      priceRange: [0, 10000],
      rating: 0,
      inStock: false,
      sortBy: 'name'
    });
  };

  const isInCart = (productId) => cart.some(item => item.id === productId);
  const isInWishlist = (productId) => wishlist.some(item => item.id === productId);

  return (
    <div className="search-page">
      <div className="page-container">
        {/* Search Header */}
        <div className="search-header">
          <h1>
            {query ? `Search results for "${query}"` : 
             categoryParam ? `${categoryParam} Products` : 
             'All Products'}
          </h1>
          <p>{filteredProducts.length} products found</p>
        </div>

        <div className="search-layout">
          {/* Filters Sidebar */}
          <div className="filters-sidebar">
            <div className="filters-header">
              <h3>Filters</h3>
              <button className="btn btn-outline btn-small" onClick={clearFilters}>
                Clear All
              </button>
            </div>

            {/* Category Filter */}
            <div className="filter-section">
              <h4>Category</h4>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="form-select"
              >
                <option value="">All Categories</option>
                {Object.keys(categories).map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Price Range Filter */}
            <div className="filter-section">
              <h4>Price Range</h4>
              <div className="price-range">
                <input
                  type="range"
                  min="0"
                  max="10000"
                  value={filters.priceRange[1]}
                  onChange={(e) => handleFilterChange('priceRange', [0, parseInt(e.target.value)])}
                  className="price-slider"
                />
                <div className="price-labels">
                  <span>₹0</span>
                  <span>₹{filters.priceRange[1]}</span>
                </div>
              </div>
            </div>

            {/* Rating Filter */}
            <div className="filter-section">
              <h4>Minimum Rating</h4>
              <div className="rating-filter">
                {[1, 2, 3, 4, 5].map(rating => (
                  <button
                    key={rating}
                    className={`rating-btn ${filters.rating === rating ? 'active' : ''}`}
                    onClick={() => handleFilterChange('rating', rating)}
                  >
                    {'⭐'.repeat(rating)} & up
                  </button>
                ))}
              </div>
            </div>

            {/* Stock Filter */}
            <div className="filter-section">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={filters.inStock}
                  onChange={(e) => handleFilterChange('inStock', e.target.checked)}
                />
                <span className="checkmark"></span>
                In Stock Only
              </label>
            </div>
          </div>

          {/* Products Section */}
          <div className="products-section">
            {/* Sort Options */}
            <div className="sort-section">
              <label>Sort by:</label>
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className="form-select"
              >
                <option value="name">Name (A-Z)</option>
                <option value="price-low">Price (Low to High)</option>
                <option value="price-high">Price (High to Low)</option>
                <option value="rating">Rating (High to Low)</option>
                <option value="discount">Discount (High to Low)</option>
              </select>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="loading">
                <div className="loading-spinner">🔄</div>
                <p>Searching products...</p>
              </div>
            )}

            {/* No Results */}
            {!loading && filteredProducts.length === 0 && (
              <div className="empty-state">
                <div className="empty-state-icon">🔍</div>
                <h3>No products found</h3>
                <p>Try adjusting your search criteria or filters</p>
                <button className="btn btn-primary" onClick={clearFilters}>
                  Clear Filters
                </button>
              </div>
            )}

            {/* Products Grid */}
            {!loading && filteredProducts.length > 0 && (
              <div className="product-grid">
                {filteredProducts.map(product => (
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
            )}

            {/* Load More Button - for pagination */}
            {!loading && filteredProducts.length > 0 && filteredProducts.length >= 20 && (
              <div className="text-center mt-3">
                <button className="btn btn-outline">
                  Load More Products
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Search Suggestions */}
        {!loading && query && filteredProducts.length === 0 && (
          <div className="search-suggestions">
            <h3>Search Suggestions</h3>
            <div className="suggestion-tags">
              <button className="suggestion-tag" onClick={() => setSearchParams({ q: 'rice' })}>Rice</button>
              <button className="suggestion-tag" onClick={() => setSearchParams({ q: 'oil' })}>Oil</button>
              <button className="suggestion-tag" onClick={() => setSearchParams({ q: 'soap' })}>Soap</button>
              <button className="suggestion-tag" onClick={() => setSearchParams({ q: 'dal' })}>Dal</button>
              <button className="suggestion-tag" onClick={() => setSearchParams({ q: 'detergent' })}>Detergent</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;