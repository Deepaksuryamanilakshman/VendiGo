import React, { useState } from 'react';
import './sideNav.css';
// Import professional icons from react-icons/md or similar
import { 
  MdDashboard, MdViewModule, MdReceipt, 
  MdBarChart, MdInventory, MdChat, 
  MdSettings, MdLogout, MdMenu
} from 'react-icons/md';

// Define the navigation items
const navItems = [
  { name: 'Dashboard', icon: MdDashboard, link: '/dashboard' },
  { name: 'Product Management', icon: MdViewModule, link: '/products' },
  { name: 'Orders Management', icon: MdReceipt, link: '/orders' },
  { name: 'Earnings / Reports', icon: MdBarChart, link: '/reports' },
  { name: 'Inventory', icon: MdInventory, link: '/inventory' },
  { name: 'Messages / Chat', icon: MdChat, link: '/messages' },
  { name: 'Settings', icon: MdSettings, link: '/settings' },
];

// Define the soft pastel accent color (using Tailwind classes for simplicity)
// Pastel Blue: bg-blue-50/70, text-blue-700
// Pastel Pink: bg-pink-50/70, text-pink-700
const ACTIVE_ACCENT_BG = 'bg-pink-50/70'; 
const ACTIVE_ACCENT_TEXT = 'text-pink-700';

const SideNav = () => {
  // State for the currently active link (for demonstration)
  const [activeLink, setActiveLink] = useState('/dashboard');
  // State for the sidebar collapse (for responsiveness)
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Toggle button for smaller screens (Requirement 8)
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    // Main container: Fixed, full-height, white background, shadow (Requirement 1, 9)
    <div 
      className={`
        fixed left-0 top-0 h-screen bg-white shadow-xl 
        flex flex-col z-50 transition-all duration-300 ease-in-out
        ${isCollapsed ? 'w-20' : 'w-64'} 
        lg:w-64 lg:static lg:shadow-xl lg:min-h-screen
      `}
      style={{ boxShadow: isCollapsed ? '2px 0 10px rgba(0, 0, 0, 0.05)' : '4px 0 15px rgba(0, 0, 0, 0.08)' }}
    >
      
      {/* --- Collapse Button (Mobile/Small Screen) --- */}
      <div className="p-4 lg:hidden">
        <button 
          onClick={toggleCollapse} 
          className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition duration-150"
          aria-label="Toggle Navigation"
        >
          <MdMenu size={24} />
        </button>
      </div>

      {/* --- Qwipo Logo (Requirement 2) --- */}
      <div className={`p-6 border-b border-gray-100 ${isCollapsed ? 'hidden lg:block' : ''}`}>
        <h1 className="text-2xl font-black text-gray-800 tracking-wider">
          <span className={`${ACTIVE_ACCENT_TEXT}`}>Qwi</span>po
        </h1>
        {/* Placeholder for a small professional logo image:  */}
      </div>

      {/* --- Navigation Items --- */}
      <nav className="flex-grow p-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = item.link === activeLink;
          const labelVisible = !isCollapsed;

          return (
            <div 
              key={item.name}
              onClick={() => setActiveLink(item.link)}
              // Item container: Rounded, smooth transitions, hover effects (Req. 4, 6, 9)
              className={`
                flex items-center p-3 rounded-xl cursor-pointer 
                transition-all duration-200 ease-in-out
                text-gray-600 font-medium
                ${isActive 
                  ? `${ACTIVE_ACCENT_BG} ${ACTIVE_ACCENT_TEXT}` // Active style
                  : 'hover:bg-gray-50 hover:text-gray-800' // Hover style
                }
                ${isCollapsed ? 'justify-center' : ''}
              `}
              // Custom style for subtle active highlight border
              style={isActive ? { borderLeft: `4px solid ${ACTIVE_ACCENT_TEXT.includes('pink') ? '#ec4899' : '#3b82f6'}`, marginLeft: '-4px' } : {}}
            >
              {/* Icon (Requirement 5) */}
              <item.icon 
                size={22} 
                className={`
                  ${isActive ? 'text-pink-600' : 'text-gray-500'}
                  ${isCollapsed ? '' : 'mr-4'}
                  transition-colors duration-200 ease-in-out
                `} 
              />
              
              {/* Label (Hidden when collapsed) */}
              <span className={`whitespace-nowrap ${labelVisible ? 'block' : 'hidden'} lg:block`}>
                {item.name}
              </span>
            </div>
          );
        })}
      </nav>

      {/* --- Logout Item --- */}
      <div className="p-4 border-t border-gray-100 mt-auto">
        <div 
          onClick={() => alert('Logged out!')} // Placeholder action
          className={`
            flex items-center p-3 rounded-xl cursor-pointer 
            transition duration-200 ease-in-out
            text-red-500 font-medium hover:bg-red-50/70
            ${isCollapsed ? 'justify-center' : ''}
          `}
        >
          <MdLogout size={22} className={`${isCollapsed ? '' : 'mr-4'}`} />
          <span className={`whitespace-nowrap ${!isCollapsed ? 'block' : 'hidden'} lg:block`}>
            Logout
          </span>
        </div>
      </div>
    </div>
  );
};

export default SideNav;

// Add a separate CSS file or a style block for a subtle glow/animation effect on hover
/*
// Optional: Add to a separate CSS file (e.g., globals.css) for the icon glow on hover
.hover\:icon-glow:hover svg {
    filter: drop-shadow(0 0 5px rgba(236, 72, 153, 0.7)); // Adjust color for blue/pink
}

// Add the class 'hover:icon-glow' to the outer div in the component.
// Note: Tailwind CSS offers an easy way to achieve this using 'ring' or 'shadow-sm' on hover instead of custom CSS filters.
*/