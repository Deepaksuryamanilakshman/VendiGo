// Header.js
import React, { useState } from "react";
import { FaBell, FaSearch, FaUserCircle, FaChevronDown } from "react-icons/fa";

function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "end",
        alignItems: "center",
        padding: "32px 20px",
        background: "linear-gradient(90deg, #fdf3f3, #f6dede, #f9f0f0, #f9d6da, #ffffff)", /* Added pinkish tone in middle */
        color: "#000000ff",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        height:"40px"
      }}
    >
      {/* Left Section - Logo */}
      <div style={{ position:"fixed",fontSize: "20px", fontWeight: "bold", letterSpacing: "1px" ,left:"20px"}}>
        VendiGo Admin Dashboard
      </div>

      {/* Middle Section - Search Bar */}
      <div
        style={{
          marginLeft: "40px",
          marginRight: "40px",
          display: "flex",
          alignItems: "center",
          background: "#ffffffff",
          borderRadius: "6px",
          padding: "5px 10px",
          border:"1px solid black",
          width:"500px"
        }}
      >
        <FaSearch style={{ marginRight: "8px", color: "#000000ff" }} />
        <input
          type="text"
          placeholder="Search..."
          style={{
            flex: 1,
            background: "whight",
            border: "none",
            outline: "none",
            color: "#000000ff",
            fontSize: "14px",
          }}
        />
      </div>

      {/* Right Section */}
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        {/* Notifications */}
        <div style={{ position: "relative", cursor: "pointer" }}>
          <FaBell size={18} />
          <span
            style={{
              position: "absolute",
              top: "-6px",
              right: "-6px",
              background: "#ef4444",
              color: "#fff",
              borderRadius: "50%",
              padding: "2px 6px",
              fontSize: "10px",
              fontWeight: "bold",
            }}
          >
            5
          </span>
        </div>

        {/* Profile Dropdown */}
        <div style={{ position: "relative" }}>
          <div
            onClick={toggleDropdown}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              cursor: "pointer",
            }}
          >
            <FaUserCircle size={22} />
            <span>Admin</span>
            <FaChevronDown size={12} />
          </div>

          {dropdownOpen && (
            <div
              style={{
                position: "absolute",
                right: 0,
                marginTop: "8px",
                background: "#fff",
                color: "#333",
                borderRadius: "6px",
                boxShadow: "0px 4px 8px rgba(0,0,0,0.15)",
                minWidth: "160px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  padding: "10px",
                  cursor: "pointer",
                  borderBottom: "1px solid #eee",
                  fontSize: "14px",
                }}
              >
                Profile
              </div>
              <div
                style={{
                  padding: "10px",
                  cursor: "pointer",
                  borderBottom: "1px solid #eee",
                  fontSize: "14px",
                }}
              >
                Settings
              </div>
              <div
                style={{
                  padding: "10px",
                  cursor: "pointer",
                  color: "red",
                  fontSize: "14px",
                }}
              >
                Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
