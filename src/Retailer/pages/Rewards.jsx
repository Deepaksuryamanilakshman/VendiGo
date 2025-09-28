import React, { useState } from 'react';

function Rewards({ user, setUser, orders }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [redeemAmount, setRedeemAmount] = useState(100);

  const pointsValue = 0.5; // 1 point = ₹0.5
  const pointsToNextLevel = 5000;
  const currentLevelPoints = user.loyaltyPoints;
  const progressPercentage = (currentLevelPoints / pointsToNextLevel) * 100;

  const membershipLevels = {
    'Bronze': { min: 0, max: 999, perks: ['5% cashback', 'Free delivery on ₹500+'] },
    'Silver': { min: 1000, max: 2499, perks: ['7% cashback', 'Free delivery on ₹300+', 'Priority support'] },
    'Gold': { min: 2500, max: 4999, perks: ['10% cashback', 'Free delivery', 'Early access to sales', 'Birthday rewards'] },
    'Platinum': { min: 5000, max: 9999, perks: ['15% cashback', 'Free delivery', 'VIP support', 'Exclusive deals', 'Monthly bonus points'] },
    'Diamond': { min: 10000, max: Infinity, perks: ['20% cashback', 'Free express delivery', 'Dedicated manager', 'Premium rewards', 'Custom discounts'] }
  };

  const getCurrentLevel = () => {
    for (const [level, data] of Object.entries(membershipLevels)) {
      if (currentLevelPoints >= data.min && currentLevelPoints <= data.max) {
        return level;
      }
    }
    return 'Bronze';
  };

  const getNextLevel = () => {
    const currentLevel = getCurrentLevel();
    const levels = Object.keys(membershipLevels);
    const currentIndex = levels.indexOf(currentLevel);
    return currentIndex < levels.length - 1 ? levels[currentIndex + 1] : null;
  };

  const currentLevel = getCurrentLevel();
  const nextLevel = getNextLevel();

  const rewardsHistory = [
    { id: 1, type: 'earned', amount: 250, description: 'Order #12345 - 5% cashback', date: '2024-01-15' },
    { id: 2, type: 'redeemed', amount: -100, description: 'Discount on Order #12344', date: '2024-01-12' },
    { id: 3, type: 'earned', amount: 150, description: 'Order #12343 - 3% cashback', date: '2024-01-10' },
    { id: 4, type: 'bonus', amount: 500, description: 'New member bonus', date: '2024-01-01' },
  ];

  const challenges = [
    { id: 1, title: 'Big Spender', description: 'Spend ₹10,000 this month', progress: 65, reward: 500, icon: '💰' },
    { id: 2, title: 'Loyal Customer', description: 'Place 10 orders this month', progress: 80, reward: 300, icon: '🛒' },
    { id: 3, title: 'Product Explorer', description: 'Try 15 new products', progress: 40, reward: 200, icon: '🔍' },
    { id: 4, title: 'Early Bird', description: 'Place 5 morning orders', progress: 20, reward: 150, icon: '🌅' },
  ];

  const redeemOptions = [
    { points: 100, value: 50, discount: '₹50 off', popular: false },
    { points: 200, value: 110, discount: '₹110 off', popular: true },
    { points: 500, value: 300, discount: '₹300 off', popular: false },
    { points: 1000, value: 650, discount: '₹650 off', popular: false },
  ];

  const handleRedeem = (points, value) => {
    if (user.loyaltyPoints >= points) {
      setUser(prev => ({
        ...prev,
        loyaltyPoints: prev.loyaltyPoints - points
      }));
      alert(`Redeemed ${points} points for ₹${value} discount! Check your account for the coupon code.`);
    } else {
      alert('Insufficient points for this redemption.');
    }
  };

  const earnPointsWays = [
    { icon: '🛒', title: 'Place Orders', description: 'Earn 1 point per ₹20 spent', points: '1pt/₹20' },
    { icon: '📝', title: 'Write Reviews', description: 'Review purchased products', points: '10pts' },
    { icon: '👥', title: 'Refer Friends', description: 'Invite friends to join', points: '500pts' },
    { icon: '📅', title: 'Daily Check-in', description: 'Open app daily', points: '5pts' },
    { icon: '🎯', title: 'Complete Challenges', description: 'Achieve monthly goals', points: 'Up to 500pts' },
    { icon: '🎂', title: 'Birthday Bonus', description: 'Annual birthday reward', points: '100pts' },
  ];

  return (
    <div className="rewards-page">
      <div className="page-container">
        <div className="page-header">
          <h1>Rewards & Loyalty 🎁</h1>
          <p>Earn points, unlock benefits, and get rewarded for your loyalty</p>
        </div>

        {/* Points Overview */}
        <div className="points-overview">
          <div className="points-card main-points">
            <div className="points-icon">💎</div>
            <div className="points-info">
              <div className="points-balance">{user.loyaltyPoints}</div>
              <div className="points-label">Loyalty Points</div>
              <div className="points-value">Worth ₹{Math.round(user.loyaltyPoints * pointsValue)}</div>
            </div>
          </div>

          <div className="level-card">
            <div className="level-info">
              <div className="current-level">
                <span className="level-badge">{currentLevel}</span>
                <span className="level-title">Member</span>
              </div>
              {nextLevel && (
                <div className="next-level">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                  <div className="progress-text">
                    {pointsToNextLevel - currentLevelPoints} points to {nextLevel}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="quick-stats">
            <div className="stat-item">
              <div className="stat-number">{rewardsHistory.filter(r => r.type === 'earned').length}</div>
              <div className="stat-label">Rewards Earned</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{rewardsHistory.filter(r => r.type === 'redeemed').length}</div>
              <div className="stat-label">Times Redeemed</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="rewards-tabs">
          <button 
            className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={`tab-btn ${activeTab === 'redeem' ? 'active' : ''}`}
            onClick={() => setActiveTab('redeem')}
          >
            Redeem Points
          </button>
          <button 
            className={`tab-btn ${activeTab === 'challenges' ? 'active' : ''}`}
            onClick={() => setActiveTab('challenges')}
          >
            Challenges
          </button>
          <button 
            className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            History
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="tab-content">
            {/* Current Level Benefits */}
            <div className="benefits-section">
              <h3>Your {currentLevel} Member Benefits</h3>
              <div className="benefits-grid">
                {membershipLevels[currentLevel].perks.map((perk, index) => (
                  <div key={index} className="benefit-card">
                    <div className="benefit-icon">✅</div>
                    <div className="benefit-text">{perk}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ways to Earn Points */}
            <div className="earn-points-section">
              <h3>Ways to Earn Points</h3>
              <div className="earn-ways-grid">
                {earnPointsWays.map((way, index) => (
                  <div key={index} className="earn-way-card">
                    <div className="earn-icon">{way.icon}</div>
                    <div className="earn-info">
                      <h4>{way.title}</h4>
                      <p>{way.description}</p>
                      <div className="earn-points">{way.points}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Membership Tiers */}
            <div className="membership-tiers">
              <h3>Membership Levels</h3>
              <div className="tiers-grid">
                {Object.entries(membershipLevels).map(([level, data]) => (
                  <div 
                    key={level} 
                    className={`tier-card ${level === currentLevel ? 'current' : ''}`}
                  >
                    <div className="tier-header">
                      <h4>{level}</h4>
                      <div className="tier-range">
                        {data.min === 0 ? '0' : data.min.toLocaleString()} - 
                        {data.max === Infinity ? '∞' : data.max.toLocaleString()} pts
                      </div>
                    </div>
                    <div className="tier-perks">
                      {data.perks.slice(0, 2).map((perk, index) => (
                        <div key={index} className="tier-perk">• {perk}</div>
                      ))}
                      {data.perks.length > 2 && (
                        <div className="more-perks">+{data.perks.length - 2} more</div>
                      )}
                    </div>
                    {level === currentLevel && (
                      <div className="current-badge">Current Level</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'redeem' && (
          <div className="tab-content">
            <div className="redeem-section">
              <h3>Redeem Your Points</h3>
              <p>Convert your loyalty points into instant discounts</p>
              
              <div className="redeem-options">
                {redeemOptions.map((option, index) => (
                  <div key={index} className={`redeem-card ${option.popular ? 'popular' : ''}`}>
                    {option.popular && <div className="popular-badge">Most Popular</div>}
                    <div className="redeem-points">{option.points} Points</div>
                    <div className="redeem-value">{option.discount}</div>
                    <div className="redeem-worth">Worth ₹{option.value}</div>
                    <button 
                      className={`btn ${user.loyaltyPoints >= option.points ? 'btn-primary' : 'btn-outline'}`}
                      onClick={() => handleRedeem(option.points, option.value)}
                      disabled={user.loyaltyPoints < option.points}
                    >
                      {user.loyaltyPoints >= option.points ? 'Redeem Now' : 'Insufficient Points'}
                    </button>
                  </div>
                ))}
              </div>

              <div className="redeem-info">
                <div className="info-card">
                  <h4>💡 Redemption Tips</h4>
                  <ul>
                    <li>Points are converted instantly into discount coupons</li>
                    <li>Coupons are valid for 30 days from redemption</li>
                    <li>Use coupons during checkout to get discounts</li>
                    <li>Higher redemptions give better value per point</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'challenges' && (
          <div className="tab-content">
            <div className="challenges-section">
              <h3>Monthly Challenges</h3>
              <p>Complete challenges to earn bonus points and unlock special rewards</p>
              
              <div className="challenges-grid">
                {challenges.map(challenge => (
                  <div key={challenge.id} className="challenge-card">
                    <div className="challenge-icon">{challenge.icon}</div>
                    <div className="challenge-info">
                      <h4>{challenge.title}</h4>
                      <p>{challenge.description}</p>
                      <div className="challenge-progress">
                        <div className="progress-bar">
                          <div 
                            className="progress-fill" 
                            style={{ width: `${challenge.progress}%` }}
                          ></div>
                        </div>
                        <div className="progress-text">{challenge.progress}% Complete</div>
                      </div>
                      <div className="challenge-reward">
                        Reward: {challenge.reward} points
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="tab-content">
            <div className="history-section">
              <h3>Points History</h3>
              <div className="history-list">
                {rewardsHistory.map(transaction => (
                  <div key={transaction.id} className="history-item">
                    <div className="history-icon">
                      {transaction.type === 'earned' ? '💰' : 
                       transaction.type === 'redeemed' ? '🛒' : '🎁'}
                    </div>
                    <div className="history-info">
                      <div className="history-description">{transaction.description}</div>
                      <div className="history-date">
                        {new Date(transaction.date).toLocaleDateString()}
                      </div>
                    </div>
                    <div className={`history-amount ${transaction.amount < 0 ? 'negative' : 'positive'}`}>
                      {transaction.amount > 0 ? '+' : ''}{transaction.amount} pts
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Rewards;