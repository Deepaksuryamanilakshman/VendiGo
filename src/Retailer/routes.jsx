import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Orders from './pages/Orders';
import Profile from './pages/Profile';
import FestivalPacks from './pages/FestivalPacks';
import Search from './pages/Search';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Notifications from './pages/Notifications';
import Rewards from './pages/Rewards';

function RetailerRoutes() {
  return (
    <Routes>
      <Route path="/retailer/dashboard" element={<Dashboard />} />
      <Route path="/retailer/orders" element={<Orders />} />
      <Route path="/retailer/profile" element={<Profile />} />
      <Route path="/retailer/festival-packs" element={<FestivalPacks />} />
      <Route path="/retailer/search" element={<Search />} />
      <Route path="/retailer/cart" element={<Cart />} />
      <Route path="/retailer/wishlist" element={<Wishlist />} />
      <Route path="/retailer/notifications" element={<Notifications />} />
      <Route path="/retailer/rewards" element={<Rewards />} />
    </Routes>
  );
}

export default RetailerRoutes;
