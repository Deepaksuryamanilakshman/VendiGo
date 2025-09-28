import React from "react";
import "./Home.css";

function Home() {
  return (
    <div className="home-container">
      <section className="hero">
        <div className="hero-text">
          <h1>Empowering India’s <span>MSME Ecosystem</span></h1>
          <p>
            Grow your business with Qwipo! Connect with retailers and sellers
            across India. Streamline your trade with logistics, secure payments,
            and a wide range of products from groceries to apparel, auto parts,
            and more.
          </p>
          <ul>
            <li>Connect with businesses of all sizes across India</li>
            <li>Source products across diverse categories</li>
            <li>Leverage cost-effective credit and price transparency</li>
            <li>Grow your sales with Qwipo's technology</li>
          </ul>
          <button className="cta-btn">Get Started!</button>
        </div>
        <div className="hero-image">
          <img
            src="https://via.placeholder.com/400x300"
            alt="Business owner"
          />
        </div>
      </section>

      <section className="partners">
        <h2>Trusted by Top Brands</h2>
        <div className="partner-logos">
          <img src="https://via.placeholder.com/100x50" alt="Brand 1" />
          <img src="https://via.placeholder.com/100x50" alt="Brand 2" />
          <img src="https://via.placeholder.com/100x50" alt="Brand 3" />
          <img src="https://via.placeholder.com/100x50" alt="Brand 4" />
        </div>
      </section>
    </div>
  );
}

export default Home;
