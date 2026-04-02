import React from "react";
import { Star, MapPin, Briefcase, Clock, CheckCircle2, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProfessionalCard = ({ pro }) => {

    const navigate = useNavigate();
  return (
    <div className="group bg-white rounded-[2.5rem] border border-gray-100 p-6 md:p-8 shadow-sm hover:shadow-xl hover:border-[#4EC9B0]/20 transition-all duration-500 flex flex-col h-full">
      
      {/* Top Header: Image & Basic Info */}
      <div className="flex gap-5 mb-6">
        <div className="relative shrink-0">
          <img
            src={pro.image}
            alt={pro.name}
            className="w-20 h-20 md:w-24 md:h-24 rounded-3xl object-cover border-4 border-gray-50"
          />
          {/* Verified Badge */}
          <div className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md">
            <CheckCircle2 size={20} className="text-[#4EC9B0]" fill="#F0FDF4" />
          </div>
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight">
                {pro.name}
              </h3>
              <p className="text-[#4EC9B0] font-bold text-xs uppercase tracking-wider mt-1">
                {pro.role}
              </p>
            </div>
            <div className="text-right">
              <span className="text-xl font-black text-gray-900">${pro.price}</span>
              <p className="text-gray-400 text-[10px] font-bold uppercase">/ hr</p>
            </div>
          </div>
          
          {/* Rating Badge - Same as your image */}
          <div className="flex items-center gap-2 mt-3">
            <div className="flex items-center gap-1 bg-[#F0FDF4] px-2.5 py-1 rounded-lg text-[#4EC9B0] font-bold text-xs">
              <Star size={14} fill="currentColor" />
              {pro.rating}
            </div>
            <span className="text-gray-400 text-xs font-medium">({pro.reviews} reviews)</span>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-2">
        {pro.desc}
      </p>

      {/* Stats Row - Professional Info */}
      <div className="grid grid-cols-3 gap-2 py-4 border-t border-b border-gray-50 mb-8">
        <div className="text-center border-r border-gray-50">
          <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Experience</p>
          <p className="text-sm font-bold text-gray-800">{pro.experience}</p>
        </div>
        <div className="text-center border-r border-gray-50">
          <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Jobs Done</p>
          <p className="text-sm font-bold text-gray-800">{pro.jobs}</p>
        </div>
        <div className="text-center">
          <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Response</p>
          <p className="text-sm font-bold text-gray-800">{pro.time || "< 2 hours"}</p>
        </div>
      </div>

      {/* Tags (Skills) */}
      <div className="flex flex-wrap gap-2 mb-8">
        {pro.tags && pro.tags.length > 0 ? (
          pro.tags.map((tag, idx) => (
            <span key={idx} className="bg-gray-50 text-gray-500 px-3 py-1 rounded-full text-[10px] font-bold border border-gray-100">
              {tag}
            </span>
          ))
        ) : (
          <span className="bg-gray-50 text-gray-400 px-3 py-1 rounded-full text-[10px] font-bold border border-gray-100">
            Professional Services
          </span>
        )}
      </div>

      {/* Action Buttons - Matching ServiceCard */}
      <div className="flex gap-3 mt-auto">
       <button 
          onClick={() => navigate(`/pro/${pro._id}`)} // 👈 View Profile navigation
          className="flex-1 border-2 border-gray-100 py-3.5 rounded-2xl font-bold text-xs text-gray-600 hover:bg-gray-50 transition-all active:scale-95"
        >
          View Profile
        </button>
      <button
  onClick={() => navigate(`/book/${pro._id}`)}
  className="flex-1 bg-[#4EC9B0]/10 text-[#4EC9B0] py-3.5 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#4EC9B0] hover:text-white transition-all duration-300 group/btn shadow-sm shadow-[#4EC9B0]/10"
>
  Hire Now
  <ArrowRight
    size={16}
    className="group-hover/btn:translate-x-1 transition-transform"
  />
</button>
      </div>

    </div>
  );
};

export default ProfessionalCard;