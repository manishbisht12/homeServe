import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Star, ArrowRight, Users, Search, Filter, SlidersHorizontal, Check } from "lucide-react";

const services = [
  { id: 1, title: "Plumbing", desc: "Expert plumbing services for repairs, installations, and maintenance", price: "$80-150", rating: "4.8", reviews: "234", pros: "2 pros", img: "https://images.unsplash.com/photo-1581578731548-c64695cc6952" },
  { id: 2, title: "Electrical", desc: "Licensed electricians for all your electrical needs and safety", price: "$90-180", rating: "4.9", reviews: "189", pros: "2 pros", img: "https://images.unsplash.com/photo-1621905251918-48416bd8575a" },
  { id: 3, title: "House Cleaning", desc: "Professional cleaning services for homes and offices", price: "$60-120", rating: "4.7", reviews: "312", pros: "1 pros", img: "https://images.unsplash.com/photo-1581579185169-22f6f7b2b3c1" },
  { id: 4, title: "Carpentry", desc: "Skilled carpenters for furniture repair and custom woodwork", price: "$70-140", rating: "4.6", reviews: "156", pros: "1 pros", img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e" },
  { id: 5, title: "Painting", desc: "Professional painters for interior and exterior projects", price: "$100-250", rating: "4.8", reviews: "201", pros: "1 pros", img: "https://images.unsplash.com/photo-1598300053653-3b5e3f7edc2f" },
  { id: 6, title: "HVAC Service", desc: "Heating, ventilation, and air conditioning experts", price: "$120-200", rating: "4.7", reviews: "178", pros: "1 pros", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c" },
];

const ServicePage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="min-h-screen bg-[#F9FAFB] antialiased">
        <Navbar/>
      {/* --- HERO / SEARCH SECTION --- */}
      <section className="bg-white border-b border-gray-100 pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            Find the Best <span className="text-[#4EC9B0]">Home Services</span>
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto mb-10">
            Compare prices, read reviews, and book top-rated professionals in minutes.
          </p>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto relative group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#4EC9B0] transition-colors" size={20} />
            <input 
              type="text"
              placeholder="Search for plumbing, electrical, cleaning..."
              className="w-full pl-14 pr-32 py-5 rounded-2xl border-2 border-gray-100 focus:border-[#4EC9B0] focus:ring-4 focus:ring-[#4EC9B0]/5 outline-none text-gray-700 font-medium shadow-sm transition-all"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#4EC9B0] text-white px-6 py-2.5 rounded-xl font-bold hover:bg-[#3fb39a] transition-all">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* --- FILTER & GRID SECTION --- */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Filter Header */}
        <div className="flex flex-wrap items-center justify-between mb-10 gap-4">
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-200 text-sm font-bold text-gray-600 cursor-pointer hover:bg-gray-50 transition-colors">
            <SlidersHorizontal size={16} /> Filters
          </div>
          <div className="text-sm text-gray-400 font-medium">
            Showing <span className="text-gray-900 font-bold">{services.length}</span> results
          </div>
        </div>

        {/* Grid - 3 Columns with Compact Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#4EC9B0]/20 transition-all duration-500 overflow-hidden flex flex-col"
            >
              {/* Image Section - Compact h-48 */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={`${item.img}?auto=format&fit=crop&w=800&q=80`}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-bold text-gray-900 shadow-md">
                  {item.price}
                </div>
              </div>

              {/* Content Section */}
              <div className="p-7 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#4EC9B0] transition-colors">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-[#4EC9B0] font-bold text-sm">
                    <Star size={16} fill="currentColor" />
                    {item.rating}
                  </div>
                </div>

                <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-6">
                  {item.desc}
                </p>

                <div className="flex items-center gap-3 text-gray-400 text-xs font-medium mb-8">
                  <span>{item.reviews} reviews</span>
                  <div className="w-1.5 h-1.5 bg-gray-200 rounded-full" />
                  <div className="flex items-center gap-1.5">
                    <Users size={16} /> {item.pros} pros
                  </div>
                </div>

                {/* Requested Buttons UI */}
                <div className="flex gap-3">
                  <button className="flex-1 border-2 border-gray-50 py-3 rounded-xl font-bold text-xs text-gray-600 hover:bg-gray-50 transition-colors">
                    View Pros
                  </button>
                  <button className="flex-1 bg-[#4EC9B0]/10 text-[#4EC9B0] py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#4EC9B0] hover:text-white transition-all duration-300 group/btn">
                    Book Now
                    <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* --- CTA SECTION --- */}
      <section className="bg-white py-20 mt-12 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-6 text-center bg-[#4EC9B0]/5 rounded-[3rem] py-12 border border-[#4EC9B0]/10">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4">
            Don't see what you're looking for?
          </h2>
          <p className="text-gray-500 font-medium mb-8">
            Tell us your requirement and we'll find the best professional for you.
          </p>
          <button className="bg-[#161617] text-white px-8 py-4 rounded-2xl font-bold hover:bg-black transition-all shadow-lg">
            Request a Service
          </button>
        </div>
      </section>
      <Footer/>
    </div>
  );
};

export default ServicePage;