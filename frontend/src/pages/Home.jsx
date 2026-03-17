import React from "react";
import Navbar from "../components/Navbar";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import PopularServices from "../components/PopularServices";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";
import CTA from "../components/CTA";
import { Search, ArrowRight, Star } from "lucide-react";

const Home = () => {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
    <section className="relative overflow-hidden bg-[#0d0c0c] text-white">
  {/* Abstract Background Glow for Depth */}
  <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-[#4EC9B0]/10 blur-[120px] rounded-full" />

  <div className="max-w-7xl mx-auto px-6 pt-24 pb-28 relative z-10">

    {/* Top Badge */}
    <div className="inline-flex items-center gap-2 bg-[#4EC9B0]/10 backdrop-blur-sm border border-[#4EC9B0]/20 px-5 py-2 rounded-full text-sm font-medium mb-8 text-[#4EC9B0]">
      <span>🚀</span>
      Trusted by 10,000+ homeowners
    </div>

    {/* Main Heading */}
    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight max-w-4xl">
      Book Trusted <br />
      Home Services <span className="text-[#4EC9B0]">in Minutes</span>
    </h1>

    {/* Subtitle */}
    <p className="text-gray-400 text-lg mt-6 max-w-2xl leading-relaxed">
      Connect with verified professionals for plumbing, electrical,
      cleaning, repairs and more. Fast booking with guaranteed quality
      service.
    </p>

    {/* Search Box */}
    <div className="mt-12 max-w-2xl">
      <div className="flex flex-col md:flex-row items-center bg-[#2D2D2D] border border-white/10 rounded-xl shadow-2xl p-2">
        <div className="flex items-center flex-1 px-4 w-full">
          <Search className="text-[#4EC9B0]" size={20} />
          <input
            type="text"
            placeholder="What service do you need?"
            className="w-full px-3 py-3 outline-none bg-transparent text-white placeholder:text-gray-500"
          />
        </div>

        <button className="w-full md:w-auto flex items-center justify-center gap-2 bg-[#4EC9B0] hover:bg-[#3fb39a] text-[#1E1E1E] px-8 py-3 rounded-lg font-bold transition-all shadow-lg shadow-[#4EC9B0]/20">
          Search Services
          <ArrowRight size={18} />
        </button>
      </div>
    </div>

    {/* Stats */}
    <div className="flex flex-wrap gap-16 mt-16 text-gray-400">
      <div>
        <h2 className="text-4xl font-bold text-white">500+</h2>
        <p className="text-sm mt-1 border-t border-[#4EC9B0]/30 pt-1">Professionals</p>
      </div>

      <div>
        <h2 className="text-4xl font-bold text-white">50k+</h2>
        <p className="text-sm mt-1 border-t border-[#4EC9B0]/30 pt-1">Jobs Completed</p>
      </div>

      <div>
        <h2 className="text-4xl font-bold text-[#4EC9B0] flex items-center gap-2">
          4.9 <Star size={22} fill="#4EC9B0" stroke="none" />
        </h2>
        <p className="text-sm mt-1 border-t border-[#4EC9B0]/30 pt-1">Average Rating</p>
      </div>
    </div>

  </div>
</section>

      <Features />
      <PopularServices />
      <HowItWorks />
      <Testimonials />
      <CTA />
      <Footer/>
    </>
  );
};

export default Home;