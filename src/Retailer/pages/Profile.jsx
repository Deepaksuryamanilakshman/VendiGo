import React, { useState } from 'react';

function Profile({ user, setUser, orders }) {
  const [activeTab, setActiveTab] = useState('primary');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    setUser(formData);
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const handleCancel = () => {
    setFormData(user);
    setIsEditing(false);
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newFormData = { ...formData, profilePicture: e.target.result };
        setFormData(newFormData);
        if (!isEditing) {
          setUser(newFormData);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const getInitials = (name) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase();
  };

  const totalOrderValue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
  const completedOrders = orders.filter(order => order.status === 'Delivered').length;

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden'
      }}>
        <div style={{
          padding: '30px',
          borderBottom: '1px solid #e2e8f0'
        }}>
          <h1 style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            color: '#1a202c',
            margin: '0 0 8px 0'
          }}>My Account</h1>
          <p style={{
            color: '#718096',
            margin: 0
          }}>Manage your account settings and preferences</p>
        </div>

        {/* Profile Tabs */}
        <div style={{
          display: 'flex',
          borderBottom: '1px solid #e2e8f0'
        }}>
          {[
            { key: 'primary', label: 'Primary Info' },
            { key: 'other', label: 'Other Info' },
            { key: 'settings', label: 'Settings' }
          ].map(tab => (
            <button
              key={tab.key}
              style={{
                padding: '16px 24px',
                border: 'none',
                backgroundColor: activeTab === tab.key ? '#3182ce' : 'transparent',
                color: activeTab === tab.key ? 'white' : '#4a5568',
                fontWeight: '500',
                cursor: 'pointer',
                borderBottom: activeTab === tab.key ? '2px solid #3182ce' : 'none',
                transition: 'all 0.2s'
              }}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Profile Content */}
        <div style={{ padding: '30px' }}>
          {activeTab === 'primary' && (
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '30px',
                gap: '20px'
              }}>
                <div style={{ position: 'relative' }}>
                  {formData.profilePicture ? (
                    <img 
                      src={formData.profilePicture} 
                      alt="Profile" 
                      style={{
                        width: '120px',
                        height: '120px',
                        borderRadius: '50%',
                        objectFit: 'cover'
                      }}
                    />
                  ) : (
                    <div style={{
                      width: '120px',
                      height: '120px',
                      borderRadius: '50%',
                      backgroundColor: '#3182ce',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '2rem',
                      fontWeight: 'bold'
                    }}>
                      {getInitials(formData.name)}
                    </div>
                  )}
                  <button 
                    style={{
                      position: 'absolute',
                      bottom: '0',
                      right: '0',
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      backgroundColor: '#3182ce',
                      color: 'white',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '16px'
                    }}
                    onClick={() => document.getElementById('profilePicture').click()}
                  >
                    📷
                  </button>
                  <input
                    id="profilePicture"
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePictureChange}
                    style={{ display: 'none' }}
                  />
                </div>
                
                <div>
                  <h2 style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    color: '#1a202c',
                    margin: '0 0 4px 0'
                  }}>{formData.name}</h2>
                  <p style={{
                    color: '#718096',
                    margin: '0 0 16px 0'
                  }}>{formData.businessType}</p>
                  <div style={{
                    display: 'flex',
                    gap: '20px'
                  }}>
                    {[
                      { value: orders.length, label: 'Total Orders' },
                      { value: `₹${totalOrderValue.toLocaleString()}`, label: 'Order Value' },
                      { value: formData.loyaltyPoints, label: 'Loyalty Points' }
                    ].map((stat, index) => (
                      <div key={index} style={{ textAlign: 'center' }}>
                        <div style={{
                          fontSize: '1.25rem',
                          fontWeight: 'bold',
                          color: '#1a202c'
                        }}>{stat.value}</div>
                        <div style={{
                          fontSize: '0.875rem',
                          color: '#718096'
                        }}>{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                {!isEditing ? (
                  <button 
                    style={{
                      backgroundColor: '#3182ce',
                      color: 'white',
                      border: 'none',
                      padding: '10px 20px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontWeight: '500'
                    }}
                    onClick={() => setIsEditing(true)}
                  >
                    ✏️ Edit Profile
                  </button>
                ) : (
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button 
                      style={{
                        backgroundColor: '#48bb78',
                        color: 'white',
                        border: 'none',
                        padding: '10px 20px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontWeight: '500'
                      }}
                      onClick={handleSave}
                    >
                      💾 Save Changes
                    </button>
                    <button 
                      style={{
                        backgroundColor: 'transparent',
                        color: '#718096',
                        border: '1px solid #e2e8f0',
                        padding: '10px 20px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontWeight: '500'
                      }}
                      onClick={handleCancel}
                    >
                      ❌ Cancel
                    </button>
                  </div>
                )}
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '20px',
                marginBottom: '20px'
              }}>
                {[
                  { label: 'Full Name', name: 'name', type: 'text' },
                  { label: 'Phone Number', name: 'phone', type: 'tel' },
                  { label: 'Email', name: 'email', type: 'email' }
                ].map((field, index) => (
                  <div key={index}>
                    <label style={{
                      display: 'block',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      color: '#374151',
                      marginBottom: '6px'
                    }}>{field.label}</label>
                    <input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        fontSize: '1rem',
                        backgroundColor: !isEditing ? '#f9fafb' : 'white',
                        color: !isEditing ? '#6b7280' : '#1f2937'
                      }}
                    />
                  </div>
                ))}

                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: '#374151',
                    marginBottom: '6px'
                  }}>Business Type</label>
                  <select
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '1rem',
                      backgroundColor: !isEditing ? '#f9fafb' : 'white',
                      color: !isEditing ? '#6b7280' : '#1f2937'
                    }}
                  >
                    {[
                      'Kirana Shop', 'Supermarket', 'Restaurant', 'Hotel/PG',
                      'Bakery', 'Medical Store', 'Electronics Shop', 'Clothing Store',
                      'Stationery Shop', 'Vegetable Shop', 'Oil Trader', 'General Store'
                    ].map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#374151',
                  marginBottom: '6px'
                }}>Business Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  rows="3"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '1rem',
                    backgroundColor: !isEditing ? '#f9fafb' : 'white',
                    color: !isEditing ? '#6b7280' : '#1f2937',
                    resize: 'vertical'
                  }}
                />
              </div>
            </div>
          )}

          {activeTab === 'other' && (
            <div>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: 'bold',
                color: '#1a202c',
                marginBottom: '20px'
              }}>Business Information</h3>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '20px',
                marginBottom: '30px'
              }}>
                {[
                  { label: 'GST Number', name: 'gstNumber', placeholder: 'Enter GST Number' },
                  { label: 'Business Registration Number', name: 'businessRegNumber', placeholder: 'Enter Registration Number' },
                  { label: 'Bank Account Number', name: 'bankAccount', placeholder: 'Enter Account Number' },
                  { label: 'IFSC Code', name: 'ifscCode', placeholder: 'Enter IFSC Code' }
                ].map((field, index) => (
                  <div key={index}>
                    <label style={{
                      display: 'block',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      color: '#374151',
                      marginBottom: '6px'
                    }}>{field.label}</label>
                    <input
                      type="text"
                      name={field.name}
                      value={formData[field.name] || ''}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder={field.placeholder}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        fontSize: '1rem',
                        backgroundColor: !isEditing ? '#f9fafb' : 'white',
                        color: !isEditing ? '#6b7280' : '#1f2937'
                      }}
                    />
                  </div>
                ))}
              </div>

              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: 'bold',
                color: '#1a202c',
                marginBottom: '20px'
              }}>Delivery Preferences</h3>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '20px',
                marginBottom: '20px'
              }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: '#374151',
                    marginBottom: '6px'
                  }}>Preferred Delivery Time</label>
                  <select
                    name="deliveryTime"
                    value={formData.deliveryTime || 'anytime'}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '1rem',
                      backgroundColor: !isEditing ? '#f9fafb' : 'white',
                      color: !isEditing ? '#6b7280' : '#1f2937'
                    }}
                  >
                    <option value="anytime">Anytime</option>
                    <option value="morning">Morning (8 AM - 12 PM)</option>
                    <option value="afternoon">Afternoon (12 PM - 6 PM)</option>
                    <option value="evening">Evening (6 PM - 10 PM)</option>
                  </select>
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: '#374151',
                    marginBottom: '6px'
                  }}>Delivery Instructions</label>
                  <textarea
                    name="deliveryInstructions"
                    value={formData.deliveryInstructions || ''}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    rows="2"
                    placeholder="Special delivery instructions"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '1rem',
                      backgroundColor: !isEditing ? '#f9fafb' : 'white',
                      color: !isEditing ? '#6b7280' : '#1f2937',
                      resize: 'vertical'
                    }}
                  />
                </div>
              </div>

              {!isEditing ? (
                <button 
                  style={{
                    backgroundColor: '#3182ce',
                    color: 'white',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: '500'
                  }}
                  onClick={() => setIsEditing(true)}
                >
                  ✏️ Edit Information
                </button>
              ) : (
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button 
                    style={{
                      backgroundColor: '#48bb78',
                      color: 'white',
                      border: 'none',
                      padding: '10px 20px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontWeight: '500'
                    }}
                    onClick={handleSave}
                  >
                    💾 Save Changes
                  </button>
                  <button 
                    style={{
                      backgroundColor: 'transparent',
                      color: '#718096',
                      border: '1px solid #e2e8f0',
                      padding: '10px 20px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontWeight: '500'
                    }}
                    onClick={handleCancel}
                  >
                    ❌ Cancel
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              <div style={{ marginBottom: '30px' }}>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: 'bold',
                  color: '#1a202c',
                  marginBottom: '20px'
                }}>Account Settings</h3>
                
                {[
                  { title: 'Email Notifications', desc: 'Receive updates about orders and offers via email', defaultChecked: true },
                  { title: 'SMS Notifications', desc: 'Get SMS updates for order status and delivery', defaultChecked: true },
                  { title: 'Push Notifications', desc: 'Receive push notifications for special offers', defaultChecked: false }
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

              <div style={{ marginBottom: '30px' }}>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: 'bold',
                  color: '#1a202c',
                  marginBottom: '20px'
                }}>Privacy Settings</h3>
                
                {[
                  { title: 'Share Purchase Data', desc: 'Allow us to use your purchase data for better recommendations', defaultChecked: true },
                  { title: 'Marketing Communications', desc: 'Receive marketing emails about new products and offers', defaultChecked: false }
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

              <div style={{ marginBottom: '30px' }}>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: 'bold',
                  color: '#1a202c',
                  marginBottom: '20px'
                }}>App Preferences</h3>
                
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '20px'
                }}>
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      color: '#374151',
                      marginBottom: '6px'
                    }}>Language</label>
                    <select style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '1rem'
                    }}>
                      <option value="en">English</option>
                      <option value="hi">हिंदी</option>
                      <option value="te">తెలుగు</option>
                      <option value="ta">தமிழ்</option>
                    </select>
                  </div>

                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      color: '#374151',
                      marginBottom: '6px'
                    }}>Currency</label>
                    <select style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '1rem'
                    }}>
                      <option value="inr">Indian Rupee (₹)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div style={{
                padding: '20px',
                backgroundColor: '#fef2f2',
                borderRadius: '8px',
                border: '1px solid #fecaca'
              }}>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: 'bold',
                  color: '#dc2626',
                  marginBottom: '16px'
                }}>Danger Zone</h3>
                
                <div style={{
                  display: 'flex',
                  gap: '10px',
                  flexWrap: 'wrap'
                }}>
                  <button style={{
                    backgroundColor: 'transparent',
                    color: '#3182ce',
                    border: '1px solid #3182ce',
                    padding: '10px 20px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: '500'
                  }}>
                    🔒 Change Password
                  </button>
                  
                  <button style={{
                    backgroundColor: 'transparent',
                    color: '#dc2626',
                    border: '1px solid #dc2626',
                    padding: '10px 20px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: '500'
                  }}>
                    🗑️ Delete Account
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Account Summary */}
        <div style={{
          backgroundColor: '#f8fafc',
          padding: '30px',
          borderTop: '1px solid #e2e8f0'
        }}>
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: 'bold',
            color: '#1a202c',
            marginBottom: '20px'
          }}>Account Summary</h3>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            marginBottom: '20px'
          }}>
            {[
              { icon: '📊', value: orders.length, name: 'Total Orders' },
              { icon: '✅', value: completedOrders, name: 'Completed Orders' },
              { icon: '💰', value: `₹${totalOrderValue.toLocaleString()}`, name: 'Total Spent' },
              { icon: '🎁', value: user.loyaltyPoints, name: 'Loyalty Points' }
            ].map((stat, index) => (
              <div key={index} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                backgroundColor: 'white',
                padding: '16px',
                borderRadius: '8px',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
              }}>
                <div style={{
                  fontSize: '2rem',
                  width: '48px',
                  height: '48px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#e6f3ff',
                  borderRadius: '50%'
                }}>
                  {stat.icon}
                </div>
                <div>
                  <div style={{
                    fontSize: '1.25rem',
                    fontWeight: 'bold',
                    color: '#1a202c'
                  }}>{stat.value}</div>
                  <div style={{
                    fontSize: '0.875rem',
                    color: '#718096'
                  }}>{stat.name}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'white',
            padding: '16px',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
          }}>
            <p style={{
              margin: 0,
              color: '#718096'
            }}>Member since: January 2024</p>
            <div style={{
              backgroundColor: '#fbbf24',
              color: 'white',
              padding: '6px 12px',
              borderRadius: '20px',
              fontSize: '0.875rem',
              fontWeight: '500'
            }}>
              🏆 Gold Member
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Demo data for testing
const demoUser = {
  name: 'Rajesh Kumar',
  email: 'rajesh.kumar@example.com',
  phone: '+91 98765 43210',
  address: '123 Main Street, Sector 15, Guntur, Andhra Pradesh 522001',
  businessType: 'Kirana Shop',
  loyaltyPoints: 2500,
  gstNumber: '37AAAAA0000A1Z5',
  businessRegNumber: 'BRN123456789',
  bankAccount: '1234567890',
  ifscCode: 'SBIN0001234',
  deliveryTime: 'morning',
  deliveryInstructions: 'Call before delivery'
};

const demoOrders = [
  { id: 1, totalAmount: 1500, status: 'Delivered' },
  { id: 2, totalAmount: 2300, status: 'Delivered' },
  { id: 3, totalAmount: 890, status: 'Processing' },
  { id: 4, totalAmount: 1200, status: 'Delivered' },
  { id: 5, totalAmount: 3400, status: 'Shipped' }
];

// Demo component wrapper
function ProfileDemo() {
  const [user, setUser] = useState(demoUser);

  return (
    <Profile 
      user={user} 
      setUser={setUser} 
      orders={demoOrders} 
    />
  );
}

export default ProfileDemo;