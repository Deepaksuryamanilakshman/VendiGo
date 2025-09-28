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
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="orders" element={<Orders />} />
      <Route path="profile" element={<Profile />} />
      <Route path="festival-packs" element={<FestivalPacks />} />
      <Route path="search" element={<Search />} />
      <Route path="cart" element={<Cart />} />
      <Route path="wishlist" element={<Wishlist />} />
      <Route path="notifications" element={<Notifications />} />
      <Route path="rewards" element={<Rewards />} />
    </Routes>
  );
}

export default RetailerRoutes;
