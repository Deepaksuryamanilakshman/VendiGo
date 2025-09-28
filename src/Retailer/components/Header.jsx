import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';

function Header({ user, cartItemsCount, wishlistItemsCount, notificationsCount }) {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const getInitials = (name) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase();
  };

  return (
    <header className="header">
      <div className="header-left">
        <Link to="/dashboard" className="logo">
          Qwipo B2B
        </Link>
      </div>
      
      <div className="header-center">
        <SearchBar />
      </div>
      
      <div className="header-right">
        <div className="profile-section" onClick={handleProfileClick}>
          <div className="profile-avatar">
            {user.profilePicture ? (
              <img 
                src={user.profilePicture} 
                alt="Profile" 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  borderRadius: '50%', 
                  objectFit: 'cover' 
                }} 
              />
            ) : (
              getInitials(user.name)
            )}
          </div>
          <div className="profile-info">
            <h4>{user.name}</h4>
            <p>{user.businessType}</p>
          </div>
        </div>
        
        <Link to="/wishlist" className="header-icon">
          ❤️
          {wishlistItemsCount > 0 && (
            <span className="icon-badge">{wishlistItemsCount}</span>
          )}
        </Link>
        
        <Link to="/cart" className="header-icon">
          🛒
          {cartItemsCount > 0 && (
            <span className="icon-badge">{cartItemsCount}</span>
          )}
        </Link>
        
        <Link to="/notifications" className="header-icon">
          🔔
          {notificationsCount > 0 && (
            <span className="icon-badge">{notificationsCount}</span>
          )}
        </Link>
      </div>
    </header>
  );
}

export default Header;