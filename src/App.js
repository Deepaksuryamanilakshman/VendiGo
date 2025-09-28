import React from 'react';
import RetailerApp from './Retailer/App';

function App() {
  return (
    <div className="main-app">
      {/* For now, we're only showing the Retailer app */}
      {/* In the future, you can add routing here to switch between different apps */}
      <RetailerApp />
    </div>
  );
}

export default App;