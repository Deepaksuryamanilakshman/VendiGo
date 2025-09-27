import React from 'react';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to Qwipo Clone</h1>
      <p>Your B2B Marketplace for Retailers and Suppliers.</p>
      <h2>Top Categories</h2>
      <ul className="categories-list">
        <li>Groceries</li>
        <li>Staples</li>
        <li>FMCG Products</li>
        <li>Beverages</li>
      </ul>
    </div>
  );
}

export default Home;
