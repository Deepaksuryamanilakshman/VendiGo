import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Search from './pages/Search';
import Orders from './pages/Orders';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Profile from './pages/Profile';
import Notifications from './pages/Notifications';
import Rewards from './pages/Rewards';
import FestivalPacks from './pages/FestivalPacks';
import './styles/retailer.css';

function App() {
  const [user, setUser] = useState({
    name: 'Rajesh Kumar',
    phone: '+919032404751',
    email: 'rajesh@gmail.com',
    businessType: 'Kirana Shop',
    address: 'Shop No. 12, Gandhi Nagar, Vijayawada',
    gstNumber: '37ABCDE1234F1Z5',
    profilePicture: null,
    loyaltyPoints: 2500
  });

  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [orders, setOrders] = useState([
    {
      id: 1001,
      items: [
        { id: 1, name: 'Basmati Rice Premium', price: 450, quantity: 2 },
        { id: 2, name: 'Toor Dal', price: 120, quantity: 1 }
      ],
      totalAmount: 1020,
      orderDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'Delivered',
      deliveryAddress: 'Shop No. 12, Gandhi Nagar, Vijayawada',
      paymentMethod: 'Credit Card'
    },
    {
      id: 1002,
      items: [
        { id: 3, name: 'Sunflower Oil', price: 180, quantity: 1 }
      ],
      totalAmount: 180,
      orderDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'Processing',
      deliveryAddress: 'Shop No. 12, Gandhi Nagar, Vijayawada',
      paymentMethod: 'UPI'
    }
  ]);
  const [notifications, setNotifications] = useState([]);

  const addToCart = (product, quantity = 1) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateCartQuantity = (productId, quantity) => {
    if (quantity === 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item => 
        item.id === productId ? { ...item, quantity } : item
      ));
    }
  };

  const addToWishlist = (product) => {
    if (!wishlist.find(item => item.id === product.id)) {
      setWishlist([...wishlist, product]);
    }
  };

  const removeFromWishlist = (productId) => {
    setWishlist(wishlist.filter(item => item.id !== productId));
  };

  const placeOrder = (orderData) => {
    const newOrder = {
      id: Date.now(),
      items: cart,
      totalAmount: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      orderDate: new Date().toISOString(),
      status: 'Processing',
      deliveryAddress: orderData.address || user.address,
      paymentMethod: orderData.paymentMethod,
      ...orderData
    };
    
    setOrders([newOrder, ...orders]);
    setCart([]);
    
    // Add notification
    const newNotification = {
      id: Date.now(),
      type: 'order',
      title: 'Order Placed Successfully',
      message: `Your order #${newOrder.id} has been placed successfully`,
      timestamp: new Date().toISOString(),
      read: false
    };
    setNotifications([newNotification, ...notifications]);
  };

  return (
    <div className="retailer-app">
      <Header 
        user={user}
        cartItemsCount={cart.length}
        wishlistItemsCount={wishlist.length}
        notificationsCount={notifications.filter(n => !n.read).length}
      />
      
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route 
          path="/dashboard" 
          element={
            <Dashboard 
              user={user}
              cart={cart}
              wishlist={wishlist}
              orders={orders}
              addToCart={addToCart}
              addToWishlist={addToWishlist}
            />
          } 
        />
        <Route 
          path="/search" 
          element={
            <Search 
              addToCart={addToCart}
              addToWishlist={addToWishlist}
              cart={cart}
              wishlist={wishlist}
            />
          } 
        />
        <Route 
          path="/orders" 
          element={
            <Orders 
              orders={orders}
              addToCart={addToCart}
            />
          } 
        />
        <Route 
          path="/cart" 
          element={
            <Cart 
              cart={cart}
              updateQuantity={updateCartQuantity}
              removeFromCart={removeFromCart}
              placeOrder={placeOrder}
            />
          } 
        />
        <Route 
          path="/wishlist" 
          element={
            <Wishlist 
              wishlist={wishlist}
              removeFromWishlist={removeFromWishlist}
              addToCart={addToCart}
            />
          } 
        />
        <Route 
          path="/profile" 
          element={
            <Profile 
              user={user}
              setUser={setUser}
              orders={orders}
            />
          } 
        />
        <Route 
          path="/notifications" 
          element={
            <Notifications 
              notifications={notifications}
              setNotifications={setNotifications}
            />
          } 
        />
        <Route 
          path="/rewards" 
          element={
            <Rewards 
              user={user}
              setUser={setUser}
              orders={orders}
            />
          } 
        />
        <Route 
          path="/festival-packs" 
          element={
            <FestivalPacks 
              addToCart={addToCart}
              addToWishlist={addToWishlist}
              cart={cart}
              wishlist={wishlist}
            />
          } 
        />
      </Routes>
    </div>
  );
}

export default App;
