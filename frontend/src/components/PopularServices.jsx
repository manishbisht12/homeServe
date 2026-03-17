import React from "react";
import { Link } from "react-router-dom";
import { Star, ArrowRight, Users } from "lucide-react";

const services = [
  { title: "Plumbing", desc: "Expert plumbing services for repairs, installations, and maintenance", price: "$80-150", rating: "4.8", reviews: "234", pros: "2 pros", img: "https://images.unsplash.com/photo-1581578731548-c64695cc6952" },
  { title: "Electrical", desc: "Licensed electricians for all your electrical needs and safety", price: "$90-180", rating: "4.9", reviews: "189", pros: "2 pros", img: "https://images.unsplash.com/photo-1621905251918-48416bd8575a" },
  { title: "House Cleaning", desc: "Professional cleaning services for homes and offices", price: "$60-120", rating: "4.7", reviews: "312", pros: "1 pros", img: "https://images.unsplash.com/photo-1581579185169-22f6f7b2b3c1" },
  { title: "Carpentry", desc: "Skilled carpenters for furniture repair and custom woodwork", price: "$70-140", rating: "4.6", reviews: "156", pros: "1 pros", img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e" },
  { title: "Painting", desc: "Professional painters for interior and exterior projects", price: "$100-250", rating: "4.8", reviews: "201", pros: "1 pros", img: "https://images.unsplash.com/photo-1598300053653-3b5e3f7edc2f" },
  { title: "HVAC Service", desc: "Heating, ventilation, and air conditioning experts", price: "$120-200", rating: "4.7", reviews: "178", pros: "1 pros", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c" },
];

const PopularServices = () => {
  return (
    <section className="bg-white py-16 antialiased">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="text-left">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
              Popular <span className="text-[#4EC9B0]">Services</span>
            </h2>
            <div className="w-12 h-1 bg-[#4EC9B0] mt-3 rounded-full" />
            <p className="text-gray-500 mt-4 text-md font-medium">
              Top-rated home services for you.
            </p>
          </div>

          <button className="group flex items-center gap-2 border-2 border-gray-100 px-5 py-2 rounded-xl font-bold text-sm text-gray-700 hover:border-[#4EC9B0] hover:text-[#4EC9B0] transition-all">
            View All
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Grid - 3 Columns */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((item, index) => (
            <div
              key={index}
              className="group bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-lg hover:border-[#4EC9B0]/20 transition-all duration-500 overflow-hidden"
            >
              {/* Image Section */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={`${item.img}?auto=format&fit=crop&w=800&q=80`}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-[12px] font-bold text-gray-900 shadow-md">
                  {item.price}
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#4EC9B0] transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm mt-2 leading-relaxed line-clamp-2">
                  {item.desc}
                </p>

                {/* Rating & Pros */}
                <div className="flex items-center gap-3 mt-5">
                  <div className="flex items-center gap-1 bg-[#4EC9B0]/10 px-2.5 py-0.5 rounded-lg text-xs font-bold text-[#4EC9B0]">
                    <Star size={12} fill="currentColor" />
                    {item.rating}
                  </div>
                  <span className="text-gray-400 text-xs font-medium">
                    ({item.reviews})
                  </span>
                  <div className="flex items-center gap-1 text-gray-400 text-xs font-medium ml-auto">
                    <Users size={14} />
                    {item.pros}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-6">
                  {/* View Pros - Border style */}
                  <button className="flex-1 border-2 border-gray-50 py-2.5 rounded-xl font-bold text-xs text-gray-600 hover:bg-gray-50 transition-colors">
                    View Pros
                  </button>
                  
                  {/* Book Now - Teal Text with Light Teal BG */}
                  <button className="flex-1 bg-[#4EC9B0]/10 text-[#4EC9B0] py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#4EC9B0] hover:text-white transition-all duration-300 shadow-sm group/btn">
                    Book Now
                    <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularServices;