import React, { useState, useEffect } from 'react';

// Mock ProductCard component
const ProductCard = ({ product, onAddToCart, onAddToWishlist, isInCart, isInWishlist }) => (
  <div style={{
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '16px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e2e8f0'
  }}>
    <img 
      src={product.image || 'https://via.placeholder.com/150'} 
      alt={product.name}
      style={{
        width: '100%',
        height: '120px',
        objectFit: 'cover',
        borderRadius: '4px',
        marginBottom: '12px'
      }}
    />
    <h4 style={{
      fontSize: '0.875rem',
      fontWeight: '500',
      color: '#1a202c',
      margin: '0 0 8px 0',
      lineHeight: '1.2'
    }}>{product.name}</h4>
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <span style={{
        fontSize: '0.875rem',
        fontWeight: 'bold',
        color: '#3182ce'
      }}>₹{product.price}</span>
      <div style={{ display: 'flex', gap: '4px' }}>
        <button
          onClick={() => onAddToWishlist(product)}
          style={{
            padding: '4px',
            border: 'none',
            backgroundColor: isInWishlist ? '#e53e3e' : '#f7fafc',
            color: isInWishlist ? 'white' : '#718096',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '12px'
          }}
        >
          ♥
        </button>
        <button
          onClick={() => onAddToCart(product, 1)}
          style={{
            padding: '4px 8px',
            border: 'none',
            backgroundColor: isInCart ? '#48bb78' : '#3182ce',
            color: 'white',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '10px'
          }}
        >
          {isInCart ? 'Added' : 'Add'}
        </button>
      </div>
    </div>
  </div>
);

// Sample products data
const sampleProducts = [
  { id: 1, name: 'Basmati Rice Premium', price: 450, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300' },
  { id: 2, name: 'Toor Dal', price: 120, image: 'https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=300' },
  { id: 3, name: 'Sunflower Oil', price: 180, image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300' },
  { id: 4, name: 'Herbal Soap', price: 45, image: 'https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=300' },
  { id: 5, name: 'Natural Shampoo', price: 95, image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=300' },
  { id: 11, name: 'Wheat Atta', price: 280, image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=300' },
  { id: 12, name: 'Green Tea', price: 150, image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=300' },
  { id: 13, name: 'Detergent Powder', price: 125, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300' },
  { id: 15, name: 'LED Bulb', price: 85, image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300' }
];

function FestivalPacks({ addToCart, addToWishlist, cart = [], wishlist = [] }) {
  const [activeFestivals, setActiveFestivals] = useState([]);
  const [selectedPack, setSelectedPack] = useState(null);
  const [countdown, setCountdown] = useState({});

  useEffect(() => {
    // Check for active festivals based on date
    const today = new Date();
    const currentMonth = today.getMonth();
    
    // Simulate festival seasons (this would be dynamic in a real app)
    const festivals = [
      {
        id: 'diwali',
        title: 'Diwali Special Bundle 🪔',
        description: 'Complete festive essentials for Diwali celebration',
        originalPrice: 3500,
        offerPrice: 2799,
        discount: 20,
        image: 'https://images.unsplash.com/photo-1605979399843-5f7223e46b52?w=500',
        products: [1, 2, 3, 11, 12], // Rice, Dal, Oil, Atta, Green Tea
        validTill: '2024-11-15',
        active: currentMonth === 10 || currentMonth === 9, // Oct-Nov
        features: ['Organic products', 'Premium quality', 'Special packaging', 'Free delivery'],
        savings: '₹701 saved'
      },
      {
        id: 'holi',
        title: 'Holi Colors & Sweets Pack 🌈',
        description: 'Everything you need for colorful Holi celebrations',
        originalPrice: 2200,
        offerPrice: 1899,
        discount: 14,
        image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=500',
        products: [4, 5, 12], // Soap, Shampoo, Green Tea
        validTill: '2024-03-25',
        active: currentMonth === 2, // March
        features: ['Natural colors', 'Traditional sweets', 'Skin-safe products', 'Festive packaging'],
        savings: '₹301 saved'
      },
      {
        id: 'eid',
        title: 'Eid Mubarak Special Pack 🌙',
        description: 'Premium items for Eid festivities',
        originalPrice: 2800,
        offerPrice: 2399,
        discount: 14,
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500',
        products: [1, 3, 11, 12], // Rice, Oil, Atta, Green Tea
        validTill: '2024-04-20',
        active: currentMonth === 3, // April
        features: ['Halal certified', 'Premium quality', 'Special dates included', 'Gift packaging'],
        savings: '₹401 saved'
      },
      {
        id: 'christmas',
        title: 'Christmas Joy Bundle 🎄',
        description: 'Spread joy with this special Christmas collection',
        originalPrice: 3200,
        offerPrice: 2699,
        discount: 16,
        image: 'https://images.unsplash.com/photo-1512909385436-8c5da2cb2e15?w=500',
        products: [4, 5, 12, 13], // Soap, Shampoo, Green Tea, Detergent
        validTill: '2024-12-31',
        active: currentMonth === 11, // December
        features: ['Holiday specials', 'Gift wrapping', 'Premium brands', 'Festive discounts'],
        savings: '₹501 saved'
      },
      {
        id: 'new-year',
        title: 'New Year Fresh Start Pack 🎊',
        description: 'Start the new year with fresh essentials',
        originalPrice: 2500,
        offerPrice: 2199,
        discount: 12,
        image: 'https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=500',
        products: [4, 5, 13, 15], // Soap, Shampoo, Detergent, LED Bulb
        validTill: '2024-01-15',
        active: currentMonth === 0, // January
        features: ['Health & wellness', 'Home essentials', 'Energy efficient', 'Fresh start'],
        savings: '₹301 saved'
      }
    ];

    // For demo purposes, show at least one active festival
    const activeFestivalsData = festivals.filter(f => f.active);
    if (activeFestivalsData.length === 0) {
      activeFestivalsData.push(festivals[0]); // Show Diwali as default
      activeFestivalsData[0].active = true;
    }

    setActiveFestivals(activeFestivalsData);

    // Set up countdown timer
    const timer = setInterval(() => {
      const newCountdown = {};
      activeFestivalsData.forEach(festival => {
        const endDate = new Date(festival.validTill);
        const now = new Date();
        const timeDiff = endDate - now;
        
        if (timeDiff > 0) {
          const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
          const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
          
          newCountdown[festival.id] = { days, hours, minutes, seconds };
        }
      });
      setCountdown(newCountdown);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handlePackPurchase = (pack) => {
    const packProducts = pack.products.map(productId => 
      sampleProducts.find(p => p.id === productId)
    ).filter(Boolean);
    
    packProducts.forEach(product => {
      addToCart(product, 1);
    });
    
    alert(`${pack.title} added to cart! You saved ${pack.savings}!`);
  };

  const isInCart = (productId) => cart.some(item => item.id === productId);
  const isInWishlist = (productId) => wishlist.some(item => item.id === productId);

  const getPackProducts = (pack) => {
    return pack.products.map(productId => 
      sampleProducts.find(p => p.id === productId)
    ).filter(Boolean);
  };

  if (activeFestivals.length === 0) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#f8fafc',
        padding: '20px'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          textAlign: 'center',
          paddingTop: '60px'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '60px 40px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{
              fontSize: '4rem',
              marginBottom: '20px'
            }}>🎉</div>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#1a202c',
              marginBottom: '12px'
            }}>No Active Festivals</h2>
            <p style={{
              color: '#718096',
              marginBottom: '40px'
            }}>Festival packs will appear here during special occasions and festive seasons</p>
            
            <div style={{
              backgroundColor: '#f8fafc',
              borderRadius: '8px',
              padding: '30px',
              textAlign: 'left'
            }}>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: 'bold',
                color: '#1a202c',
                marginBottom: '20px',
                textAlign: 'center'
              }}>Upcoming Festivals</h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '16px'
              }}>
                {[
                  { emoji: '🪔', name: 'Diwali', time: 'October/November' },
                  { emoji: '🌈', name: 'Holi', time: 'March' },
                  { emoji: '🌙', name: 'Eid', time: 'Based on lunar calendar' },
                  { emoji: '🎄', name: 'Christmas', time: 'December' }
                ].map((festival, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px',
                    backgroundColor: 'white',
                    borderRadius: '6px'
                  }}>
                    <span style={{ fontSize: '1.5rem' }}>{festival.emoji}</span>
                    <div>
                      <div style={{ fontWeight: '500', color: '#1a202c' }}>{festival.name}</div>
                      <div style={{ fontSize: '0.875rem', color: '#718096' }}>{festival.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          padding: '30px',
          marginBottom: '20px'
        }}>
          <h1 style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            color: '#1a202c',
            margin: '0 0 8px 0'
          }}>Festival & Seasonal Packs 🎉</h1>
          <p style={{
            color: '#718096',
            margin: 0
          }}>Special curated bundles for festive celebrations</p>
        </div>

        {/* Active Festivals */}
        <div style={{
          display: 'grid',
          gap: '24px'
        }}>
          {activeFestivals.map(festival => (
            <div key={festival.id} style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden'
            }}>
              {/* Festival Header */}
              <div style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                padding: '30px'
              }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr auto',
                  gap: '20px',
                  alignItems: 'center'
                }}>
                  <div>
                    <h2 style={{
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      margin: '0 0 8px 0'
                    }}>{festival.title}</h2>
                    <p style={{
                      margin: '0 0 16px 0',
                      opacity: 0.9
                    }}>{festival.description}</p>
                    
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      marginBottom: '16px'
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'baseline',
                        gap: '8px'
                      }}>
                        <span style={{
                          fontSize: '1.5rem',
                          fontWeight: 'bold'
                        }}>₹{festival.offerPrice}</span>
                        <span style={{
                          fontSize: '1rem',
                          textDecoration: 'line-through',
                          opacity: 0.7
                        }}>₹{festival.originalPrice}</span>
                      </div>
                      <span style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '0.875rem',
                        fontWeight: '500'
                      }}>{festival.discount}% OFF</span>
                      <span style={{
                        backgroundColor: '#48bb78',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '0.875rem',
                        fontWeight: '500'
                      }}>{festival.savings}</span>
                    </div>

                    {/* Features */}
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '8px'
                    }}>
                      {festival.features.map((feature, index) => (
                        <span key={index} style={{
                          backgroundColor: 'rgba(255, 255, 255, 0.15)',
                          padding: '4px 8px',
                          borderRadius: '12px',
                          fontSize: '0.75rem'
                        }}>✓ {feature}</span>
                      ))}
                    </div>
                  </div>

                  {/* Countdown Timer */}
                  {countdown[festival.id] && (
                    <div style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '8px',
                      padding: '20px',
                      textAlign: 'center',
                      minWidth: '200px'
                    }}>
                      <div style={{
                        fontSize: '0.875rem',
                        marginBottom: '8px',
                        opacity: 0.8
                      }}>Offer ends in</div>
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        gap: '8px',
                        fontSize: '0.75rem'
                      }}>
                        <div>
                          <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
                            {countdown[festival.id].days}
                          </div>
                          <div>Days</div>
                        </div>
                        <div>
                          <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
                            {countdown[festival.id].hours}
                          </div>
                          <div>Hours</div>
                        </div>
                        <div>
                          <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
                            {countdown[festival.id].minutes}
                          </div>
                          <div>Min</div>
                        </div>
                        <div>
                          <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
                            {countdown[festival.id].seconds}
                          </div>
                          <div>Sec</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Pack Contents */}
              <div style={{ padding: '30px' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '20px'
                }}>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: 'bold',
                    color: '#1a202c',
                    margin: 0
                  }}>What's included ({getPackProducts(festival).length} items)</h3>
                  
                  <div style={{
                    display: 'flex',
                    gap: '12px'
                  }}>
                    <button
                      onClick={() => setSelectedPack(selectedPack === festival.id ? null : festival.id)}
                      style={{
                        padding: '8px 16px',
                        border: '1px solid #3182ce',
                        borderRadius: '6px',
                        backgroundColor: 'transparent',
                        color: '#3182ce',
                        cursor: 'pointer',
                        fontSize: '0.875rem',
                        fontWeight: '500'
                      }}
                    >
                      {selectedPack === festival.id ? 'Hide Details' : 'View Details'}
                    </button>
                    <button
                      onClick={() => handlePackPurchase(festival)}
                      style={{
                        padding: '8px 24px',
                        border: 'none',
                        borderRadius: '6px',
                        backgroundColor: '#3182ce',
                        color: 'white',
                        cursor: 'pointer',
                        fontSize: '0.875rem',
                        fontWeight: '500'
                      }}
                    >
                      🛒 Add Entire Pack
                    </button>
                  </div>
                </div>

                {/* Product Grid - Always visible with limited view */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                  gap: '16px',
                  marginBottom: selectedPack === festival.id ? '20px' : '0'
                }}>
                  {getPackProducts(festival).slice(0, selectedPack === festival.id ? undefined : 4).map(product => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={addToCart}
                      onAddToWishlist={addToWishlist}
                      isInCart={isInCart(product.id)}
                      isInWishlist={isInWishlist(product.id)}
                    />
                  ))}
                  
                  {selectedPack !== festival.id && getPackProducts(festival).length > 4 && (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#f8fafc',
                      borderRadius: '8px',
                      border: '2px dashed #cbd5e0',
                      minHeight: '180px',
                      cursor: 'pointer'
                    }}
                    onClick={() => setSelectedPack(festival.id)}
                    >
                      <div style={{ textAlign: 'center', color: '#718096' }}>
                        <div style={{ fontSize: '1.5rem', marginBottom: '8px' }}>+</div>
                        <div style={{ fontSize: '0.875rem' }}>
                          {getPackProducts(festival).length - 4} more items
                        </div>
                        <div style={{ fontSize: '0.75rem' }}>Click to view all</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Pack Benefits */}
                <div style={{
                  backgroundColor: '#f0f9ff',
                  borderRadius: '8px',
                  padding: '16px',
                  border: '1px solid #bfdbfe'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '8px'
                  }}>
                    <span style={{ fontSize: '1.25rem' }}>💡</span>
                    <span style={{
                      fontWeight: '500',
                      color: '#1e40af'
                    }}>Pack Benefits</span>
                  </div>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '8px',
                    fontSize: '0.875rem',
                    color: '#1e40af'
                  }}>
                    <div>💰 Save {festival.savings} vs individual purchase</div>
                    <div>🚚 Free delivery on pack orders</div>
                    <div>🎁 Special festive packaging included</div>
                    <div>⚡ Priority processing & delivery</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          padding: '30px',
          marginTop: '20px'
        }}>
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: 'bold',
            color: '#1a202c',
            marginBottom: '16px'
          }}>Why Choose Festival Packs?</h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px'
          }}>
            {[
              { icon: '💰', title: 'Great Savings', desc: 'Save up to 25% compared to buying items individually' },
              { icon: '🎁', title: 'Curated Selection', desc: 'Hand-picked items perfect for each festival celebration' },
              { icon: '🚚', title: 'Free Delivery', desc: 'Complimentary delivery on all festival pack orders' },
              { icon: '⭐', title: 'Premium Quality', desc: 'Only the finest products make it into our festival collections' }
            ].map((benefit, index) => (
              <div key={index} style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px'
              }}>
                <span style={{
                  fontSize: '2rem',
                  flexShrink: 0
                }}>{benefit.icon}</span>
                <div>
                  <h4 style={{
                    fontSize: '1rem',
                    fontWeight: '500',
                    color: '#1a202c',
                    margin: '0 0 4px 0'
                  }}>{benefit.title}</h4>
                  <p style={{
                    fontSize: '0.875rem',
                    color: '#718096',
                    margin: 0,
                    lineHeight: '1.4'
                  }}>{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Demo wrapper component
function FestivalPacksDemo() {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const addToCart = (product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const addToWishlist = (product) => {
    setWishlist(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.filter(item => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  return (
    <FestivalPacks
      addToCart={addToCart}
      addToWishlist={addToWishlist}
      cart={cart}
      wishlist={wishlist}
    />
  );
}

export default FestivalPacksDemo;