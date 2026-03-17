import React from "react";
import { Facebook, Twitter, Instagram, Linkedin, Home } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#0d0c0c] text-gray-400 py-20 border-t border-white/5 relative overflow-hidden">
      {/* Background Glow (matching Hero) */}
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#4EC9B0]/5 blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand & Mission */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="bg-[#1b9e84] p-2 rounded-lg">
                <Home size={18} className="text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Home<span className="text-[#4EC9B0]">Serve</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-gray-500 max-w-xs">
              Providing reliable, verified, and high-quality home services at your doorstep. 
              Transforming the way you maintain your home.
            </p>
            {/* Social Icons */}
            <div className="flex gap-4">
              <div className="p-2 bg-white/5 rounded-lg hover:bg-[#4EC9B0]/20 hover:text-[#4EC9B0] transition-all cursor-pointer">
                <Facebook size={18} />
              </div>
              <div className="p-2 bg-white/5 rounded-lg hover:bg-[#4EC9B0]/20 hover:text-[#4EC9B0] transition-all cursor-pointer">
                <Instagram size={18} />
              </div>
              <div className="p-2 bg-white/5 rounded-lg hover:bg-[#4EC9B0]/20 hover:text-[#4EC9B0] transition-all cursor-pointer">
                <Twitter size={18} />
              </div>
              <div className="p-2 bg-white/5 rounded-lg hover:bg-[#4EC9B0]/20 hover:text-[#4EC9B0] transition-all cursor-pointer">
                <Linkedin size={18} />
              </div>
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Services</h3>
            <ul className="space-y-4 text-sm">
              <li className="hover:text-[#4EC9B0] transition-colors cursor-pointer">Plumbing & Repair</li>
              <li className="hover:text-[#4EC9B0] transition-colors cursor-pointer">Electrical Solutions</li>
              <li className="hover:text-[#4EC9B0] transition-colors cursor-pointer">Professional Cleaning</li>
              <li className="hover:text-[#4EC9B0] transition-colors cursor-pointer">Carpentry Services</li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Company</h3>
            <ul className="space-y-4 text-sm">
              <li className="hover:text-[#4EC9B0] transition-colors cursor-pointer">About Us</li>
              <li className="hover:text-[#4EC9B0] transition-colors cursor-pointer">Join as Partner</li>
              <li className="hover:text-[#4EC9B0] transition-colors cursor-pointer">Latest News</li>
              <li className="hover:text-[#4EC9B0] transition-colors cursor-pointer">Customer Reviews</li>
            </ul>
          </div>

          {/* Newsletter / Contact */}
          <div>
            <h3 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Stay Updated</h3>
            <p className="text-xs text-gray-500 mb-4">Subscribe to get the latest offers.</p>
            <div className="flex flex-col gap-3">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-white/5 border border-white/10 px-4 py-2.5 rounded-xl text-sm outline-none focus:border-[#4EC9B0]/50 transition-colors"
              />
              <button className="bg-[#4EC9B0] text-[#0d0c0c] font-bold py-2.5 rounded-xl text-sm hover:bg-[#3fb39a] transition-all">
                Subscribe
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium uppercase tracking-widest">
          <p className="text-gray-600">
            © 2026 <span className="text-[#4EC9B0]">HomeServe</span>. All rights reserved.
          </p>
          <div className="flex gap-8">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms</span>
            <span className="hover:text-white cursor-pointer transition-colors">Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;