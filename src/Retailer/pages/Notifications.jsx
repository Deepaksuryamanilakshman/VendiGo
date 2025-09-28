import React, { useState, useEffect } from 'react';

function Notifications({ notifications, setNotifications }) {
  const [filter, setFilter] = useState('all');

  // Sample notifications data
  const sampleNotifications = [
    {
      id: 1,
      type: 'order',
      title: 'Order Delivered Successfully',
      message: 'Your order #12345 has been delivered successfully. Thank you for shopping with us!',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
      read: false
    },
    {
      id: 2,
      type: 'offer',
      title: 'Special Diwali Offer - 30% Off',
      message: 'Get up to 30% off on all festival essentials. Limited time offer, shop now!',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
      read: false
    },
    {
      id: 3,
      type: 'stock',
      title: 'Item Back in Stock',
      message: 'Basmati Rice Premium is now back in stock. Order now before it runs out again!',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
      read: true
    },
    {
      id: 4,
      type: 'payment',
      title: 'Payment Reminder',
      message: 'Your payment of ₹2,450 for order #12340 is due tomorrow. Please make the payment to avoid delays.',
      timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week ago
      read: true
    }
  ];

  // Initialize with sample notifications if none exist
  useEffect(() => {
    if (notifications.length === 0) {
      setNotifications(sampleNotifications);
    }
  }, [notifications.length, setNotifications]);

  const markAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const clearAllNotifications = () => {
    if (window.confirm('Are you sure you want to clear all notifications?')) {
      setNotifications([]);
    }
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'unread') return !notif.read;
    if (filter === 'read') return notif.read;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'order': return '📦';
      case 'payment': return '💰';
      case 'offer': return '🎉';
      case 'stock': return '📦';
      case 'delivery': return '🚚';
      case 'system': return '⚙️';
      case 'promotion': return '🏷️';
      default: return '🔔';
    }
  };

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const notifTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - notifTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return notifTime.toLocaleDateString();
  };

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
          }}>Notifications 🔔</h1>
          <p style={{
            color: '#718096',
            margin: 0
          }}>Stay updated with your orders, offers, and important updates</p>
        </div>

        {/* Notification Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '20px',
          marginBottom: '20px'
        }}>
          {[
            { number: notifications.length, label: 'Total' },
            { number: unreadCount, label: 'Unread' },
            { number: notifications.length - unreadCount, label: 'Read' }
          ].map((stat, index) => (
            <div key={index} style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              padding: '20px',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: '#3182ce',
                marginBottom: '8px'
              }}>{stat.number}</div>
              <div style={{
                fontSize: '0.875rem',
                color: '#718096'
              }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Notification Controls */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          padding: '20px',
          marginBottom: '20px'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div style={{
              display: 'flex',
              gap: '8px',
              flexWrap: 'wrap'
            }}>
              {[
                { key: 'all', label: `All (${notifications.length})` },
                { key: 'unread', label: `Unread (${unreadCount})` },
                { key: 'read', label: `Read (${notifications.length - unreadCount})` }
              ].map(tab => (
                <button
                  key={tab.key}
                  style={{
                    padding: '8px 16px',
                    border: 'none',
                    borderRadius: '20px',
                    backgroundColor: filter === tab.key ? '#3182ce' : '#f1f5f9',
                    color: filter === tab.key ? 'white' : '#64748b',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    transition: 'all 0.2s'
                  }}
                  onClick={() => setFilter(tab.key)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div style={{
              display: 'flex',
              gap: '8px',
              flexWrap: 'wrap'
            }}>
              {unreadCount > 0 && (
                <button 
                  style={{
                    padding: '8px 16px',
                    border: '1px solid #48bb78',
                    borderRadius: '6px',
                    backgroundColor: 'transparent',
                    color: '#48bb78',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    fontWeight: '500'
                  }}
                  onClick={markAllAsRead}
                >
                  ✅ Mark All Read
                </button>
              )}
              <button 
                style={{
                  padding: '8px 16px',
                  border: '1px solid #e53e3e',
                  borderRadius: '6px',
                  backgroundColor: 'transparent',
                  color: '#e53e3e',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: '500'
                }}
                onClick={clearAllNotifications}
              >
                🗑️ Clear All
              </button>
            </div>
          </div>
        </div>

        {/* Notifications List */}
        {filteredNotifications.length === 0 ? (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            padding: '60px 30px',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '4rem',
              marginBottom: '16px'
            }}>🔔</div>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: 'bold',
              color: '#1a202c',
              margin: '0 0 8px 0'
            }}>
              {filter === 'all' ? 'No notifications yet' :
               filter === 'unread' ? 'No unread notifications' :
               'No read notifications'}
            </h3>
            <p style={{
              color: '#718096',
              margin: 0
            }}>
              {filter === 'all' ? "You'll see your notifications here when you have some" :
               filter === 'unread' ? "All your notifications are read" :
               "No notifications have been marked as read"}
            </p>
          </div>
        ) : (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden',
            marginBottom: '20px'
          }}>
            {filteredNotifications.map((notification, index) => (
              <div 
                key={notification.id} 
                style={{
                  display: 'flex',
                  padding: '20px',
                  borderBottom: index < filteredNotifications.length - 1 ? '1px solid #e2e8f0' : 'none',
                  backgroundColor: !notification.read ? '#f0f9ff' : 'transparent',
                  cursor: !notification.read ? 'pointer' : 'default',
                  transition: 'background-color 0.2s'
                }}
                onClick={() => !notification.read && markAsRead(notification.id)}
              >
                <div style={{
                  fontSize: '2rem',
                  marginRight: '16px',
                  flexShrink: 0
                }}>
                  {getNotificationIcon(notification.type)}
                </div>
                
                <div style={{ flex: 1 }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '8px'
                  }}>
                    <div style={{
                      fontSize: '1.125rem',
                      fontWeight: 'bold',
                      color: '#1a202c'
                    }}>{notification.title}</div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      flexShrink: 0,
                      marginLeft: '12px'
                    }}>
                      <span style={{
                        fontSize: '0.75rem',
                        color: '#718096'
                      }}>{getTimeAgo(notification.timestamp)}</span>
                      {!notification.read && (
                        <span style={{
                          width: '8px',
                          height: '8px',
                          backgroundColor: '#3182ce',
                          borderRadius: '50%'
                        }}></span>
                      )}
                    </div>
                  </div>
                  <div style={{
                    fontSize: '0.875rem',
                    color: '#4a5568',
                    lineHeight: '1.5',
                    marginBottom: '12px'
                  }}>{notification.message}</div>
                  
                  {/* Notification Actions */}
                  <div style={{
                    display: 'flex',
                    gap: '8px'
                  }}>
                    {!notification.read && (
                      <button 
                        style={{
                          padding: '4px 8px',
                          border: 'none',
                          borderRadius: '4px',
                          backgroundColor: '#48bb78',
                          color: 'white',
                          cursor: 'pointer',
                          fontSize: '0.75rem'
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          markAsRead(notification.id);
                        }}
                        title="Mark as read"
                      >
                        ✅ Mark Read
                      </button>
                    )}
                    <button 
                      style={{
                        padding: '4px 8px',
                        border: 'none',
                        borderRadius: '4px',
                        backgroundColor: '#e53e3e',
                        color: 'white',
                        cursor: 'pointer',
                        fontSize: '0.75rem'
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNotification(notification.id);
                      }}
                      title="Delete notification"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Notification Settings */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          padding: '30px',
          marginBottom: '20px'
        }}>
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: 'bold',
            color: '#1a202c',
            marginBottom: '20px'
          }}>Notification Preferences</h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px'
          }}>
            {[
              { title: 'Order Updates', desc: 'Get notified about order status changes', defaultChecked: true },
              { title: 'Price Alerts', desc: 'Get notified when prices drop on wishlist items', defaultChecked: true },
              { title: 'Stock Alerts', desc: 'Get notified when out-of-stock items are available', defaultChecked: true },
              { title: 'Promotional Offers', desc: 'Receive notifications about special offers and deals', defaultChecked: false },
              { title: 'Payment Reminders', desc: 'Get reminded about pending payments', defaultChecked: true },
              { title: 'Delivery Updates', desc: 'Track your deliveries with real-time updates', defaultChecked: true }
            ].map((setting, index) => (
              <div key={index} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px 0',
                borderBottom: '1px solid #e2e8f0'
              }}>
                <div>
                  <h4 style={{
                    fontSize: '1rem',
                    fontWeight: '500',
                    color: '#1a202c',
                    margin: '0 0 4px 0'
                  }}>{setting.title}</h4>
                  <p style={{
                    fontSize: '0.875rem',
                    color: '#718096',
                    margin: 0
                  }}>{setting.desc}</p>
                </div>
                <label style={{
                  position: 'relative',
                  display: 'inline-block',
                  width: '50px',
                  height: '24px'
                }}>
                  <input 
                    type="checkbox" 
                    defaultChecked={setting.defaultChecked}
                    style={{ opacity: 0, width: 0, height: 0 }}
                  />
                  <span style={{
                    position: 'absolute',
                    cursor: 'pointer',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: setting.defaultChecked ? '#3182ce' : '#ccc',
                    borderRadius: '24px',
                    transition: '0.4s'
                  }}>
                    <span style={{
                      position: 'absolute',
                      content: '',
                      height: '18px',
                      width: '18px',
                      left: setting.defaultChecked ? '26px' : '4px',
                      bottom: '3px',
                      backgroundColor: 'white',
                      borderRadius: '50%',
                      transition: '0.4s'
                    }}></span>
                  </span>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Notification Types Info */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          padding: '30px'
        }}>
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: 'bold',
            color: '#1a202c',
            marginBottom: '20px'
          }}>Notification Types</h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '16px'
          }}>
            {[
              { icon: '📦', title: 'Order Updates', desc: 'Status changes, confirmations, and delivery notifications' },
              { icon: '💰', title: 'Payment', desc: 'Payment confirmations, reminders, and transaction updates' },
              { icon: '🎉', title: 'Offers & Deals', desc: 'Special promotions, discounts, and limited-time offers' },
              { icon: '📦', title: 'Stock Updates', desc: 'Product availability and restock notifications' },
              { icon: '🚚', title: 'Delivery', desc: 'Shipping updates, delivery schedules, and tracking info' },
              { icon: '⚙️', title: 'System', desc: 'App updates, maintenance notices, and account changes' }
            ].map((type, index) => (
              <div key={index} style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                padding: '16px',
                backgroundColor: '#f8fafc',
                borderRadius: '8px'
              }}>
                <div style={{
                  fontSize: '2rem',
                  flexShrink: 0
                }}>{type.icon}</div>
                <div>
                  <h4 style={{
                    fontSize: '1rem',
                    fontWeight: '500',
                    color: '#1a202c',
                    margin: '0 0 4px 0'
                  }}>{type.title}</h4>
                  <p style={{
                    fontSize: '0.875rem',
                    color: '#718096',
                    margin: 0,
                    lineHeight: '1.4'
                  }}>{type.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Demo component with state management
function NotificationsDemo() {
  const [notifications, setNotifications] = useState([]);

  return (
    <Notifications 
      notifications={notifications} 
      setNotifications={setNotifications} 
    />
  );
}

export default NotificationsDemo;