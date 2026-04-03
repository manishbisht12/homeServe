import React, { useState, useEffect, useRef } from "react";
import { Home, ChevronDown, LogOut, User } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const location = useLocation();
  const navigate = useNavigate();
  
  // Tab session ke liye user data nikalna (close pe clear ho jaye)
  const user = JSON.parse(sessionStorage.getItem("user"));

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Dropdown 
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    setIsDropdownOpen(false);
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  // Role based navigation links
  const navLinks = user?.role === "pro" 
    ? [
        { name: "Dashboard", path: "/pro-dashboard" },
        { name: "Service Requests", path: "/pro-jobs" },
      ]
    : [
        { name: "Home", path: "/" },
        { name: "Services", path: "/services" },
        { name: "My Bookings", path: "/my-bookings" },
        { name: "Favorites", path: "/favorites" },
      ];

  return (
    <header className="fixed top-0 left-0 w-full z-[100] flex justify-center pt-0">
      <nav
        className={`
          transition-all duration-500 ease-in-out flex items-center justify-between
          ${isScrolled 
            ? "w-[90%] md:w-[85%] mt-4 rounded-2xl bg-white/90 backdrop-blur-md shadow-lg border border-gray-100 py-3 px-8" 
            : "w-full mt-0 rounded-none bg-white border-b border-gray-200 py-4 px-10"
          }
        `}
      >
        {/* Logo Section */}
        <Link to={user?.role === "pro" ? "/pro-dashboard" : "/"} className="flex items-center gap-3">
          <div className="bg-[#1b9e84] p-2.5 rounded-xl shadow-sm">
            <Home size={18} className="text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-800">
            Home<span className="text-[#4EC9B0]">Serve</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-[15px] font-bold">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`transition-all duration-300 relative group ${
                isActive(link.path) ? "text-[#4EC9B0]" : "text-gray-600 hover:text-[#4EC9B0]"
              }`}
            >
              {link.name}
              {isActive(link.path) && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#4EC9B0] rounded-full" />
              )}
            </Link>
          ))}
        </div>

        {/* Action Buttons / User Dropdown */}
        <div className="flex items-center gap-6">
          {user ? (
            <div className="relative" ref={dropdownRef}>
              {/* Avatar Circle with Bottom-Right Arrow */}
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="relative group focus:outline-none"
              >
                <div className="w-10 h-10 rounded-full bg-[#1b9e84] flex items-center justify-center text-white font-bold text-lg border-2 border-transparent group-hover:border-[#4EC9B0] transition-all uppercase">
                  {user.name.charAt(0)}
                </div>
                {/* Small Arrow at Bottom Right */}
                <div className="absolute -bottom-1 -right-1 bg-white rounded-full border border-gray-200 p-0.5 shadow-sm text-gray-500 group-hover:text-[#4EC9B0] transition-colors">
                  <ChevronDown size={12} />
                </div>
              </button>

              {/* Simple Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-4 py-3 border-b border-gray-50">
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Account</p>
                    <p className="text-gray-900 font-bold truncate">{user.name}</p>
                  </div>
                  <div className="p-1">
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-3 py-2.5 text-red-500 hover:bg-red-50 rounded-xl transition-colors font-bold text-sm"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-6">
              <Link to="/login" className="text-gray-700 font-bold text-sm hover:text-[#4EC9B0] transition-colors">
                Sign In
              </Link>
              <Link to="/register" className="bg-[#21a98e] text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-md hover:bg-[#058f73] transition-all">
                Get Started
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;