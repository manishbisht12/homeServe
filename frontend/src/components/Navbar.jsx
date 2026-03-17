import React, { useState, useEffect } from "react";
import { Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom"; // useLocation add kiya

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation(); // Current path track karne ke liye

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Active link check karne ke liye helper function
  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "My Bookings", path: "/bookings" },
    { name: "Favorites", path: "/favorites" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-[100] flex justify-center transition-all duration-500 pt-0">
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
        <Link to="/" className="flex items-center gap-3 cursor-pointer">
          <div className="bg-[#1b9e84] p-2.5 rounded-xl shadow-sm">
            <Home size={18} className="text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-800">
            Home<span className="text-[#4EC9B0]">Serve</span>
          </span>
        </Link>

        {/* Navigation Links - Dynamically Active */}
        <div className="hidden md:flex items-center gap-8 text-[15px] font-bold">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`transition-all duration-300 relative group ${
                isActive(link.path)
                  ? "text-[#4EC9B0]" // Active color
                  : "text-gray-600 hover:text-[#4EC9B0]" // Normal color
              }`}
            >
              {link.name}
              {/* Optional: Active indicator line */}
              {isActive(link.path) && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#4EC9B0] rounded-full" />
              )}
            </Link>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-6">
          <button className="text-gray-700 font-bold text-sm hover:text-[#4EC9B0] transition-colors">
            Sign In
          </button>
          <button className="bg-[#21a98e] text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-md hover:bg-[#058f73] transform hover:scale-105 transition-all">
            Get Started
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;