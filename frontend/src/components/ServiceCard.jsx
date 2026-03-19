import React from "react";
import { Star, ArrowRight, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ServiceCard = ({ item }) => {
  const navigate = useNavigate();

  
  const slug = item.title.toLowerCase().replace(/\s+/g, "-");

  return (
    <div
      onClick={() => navigate(`/services/${slug}`)} 
      className="group cursor-pointer bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#4EC9B0]/20 transition-all duration-500 overflow-hidden flex flex-col h-full"
    >

      {/* Image */}
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

      {/* Content */}
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
            <Users size={16} /> {item.pros}
          </div>
        </div>

        {/* Buttons */}
        <div
          className="flex gap-3 mt-auto"
          onClick={(e) => e.stopPropagation()} // 👈 prevent full card click
        >
          <button
            onClick={() => navigate(`/services/${slug}`)}
            className="flex-1 border-2 border-gray-50 py-3 rounded-xl font-bold text-xs text-gray-600 hover:bg-gray-50 transition-colors"
          >
            View Pros
          </button>

        <button 
            onClick={() => navigate(`/book/${item.id || slug}`)} // 👈 Booking page par navigate karega
            className="flex-1 bg-[#F0FDF4] text-[#4EC9B0] py-3.5 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#4EC9B0] hover:text-white transition-all duration-300 group/btn shadow-sm"
          >
            Book Now
            <ArrowRight
              size={16}
              className="group-hover/btn:translate-x-1 transition-transform"
            />
          </button>
        </div>

      </div>
    </div>
  );
};

export default ServiceCard;