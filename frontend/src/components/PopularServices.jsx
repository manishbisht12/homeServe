import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ServiceCard from "../components/ServiceCard"; // Reusable component use kar rahe hain

const services = [
  { id: 1, title: "Plumbing", desc: "Expert plumbing services for repairs, installations, and maintenance", price: "$80-150", rating: "4.8", reviews: "234", pros: "2 pros", img: "https://images.unsplash.com/photo-1581578731548-c64695cc6952" },
  { id: 2, title: "Electrical", desc: "Licensed electricians for all your electrical needs and safety", price: "$90-180", rating: "4.9", reviews: "189", pros: "2 pros", img: "https://images.unsplash.com/photo-1621905251918-48416bd8575a" },
  { id: 3, title: "Cleaning", desc: "Professional cleaning services for homes and offices", price: "$60-120", rating: "4.7", reviews: "312", pros: "1 pros", img: "https://images.unsplash.com/photo-1581579185169-22f6f7b2b3c1" },
  { id: 4, title: "Carpentry", desc: "Skilled carpenters for furniture repair and custom woodwork", price: "$70-140", rating: "4.6", reviews: "156", pros: "1 pros", img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e" },
  { id: 5, title: "Painting", desc: "Professional painters for interior and exterior projects", price: "$100-250", rating: "4.8", reviews: "201", pros: "1 pros", img: "https://images.unsplash.com/photo-1598300053653-3b5e3f7edc2f" },
  { id: 6, title: "Repair", desc: "Heating, ventilation, and air conditioning experts", price: "$120-200", rating: "4.7", reviews: "178", pros: "1 pros", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c" },
];

const PopularServices = () => {
  return (
    <section className="bg-white py-16 antialiased">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="text-left">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] tracking-tight">
              Popular <span className="text-[#4EC9B0]">Services</span>
            </h2>
            <div className="w-12 h-1 bg-[#4EC9B0] mt-3 rounded-full" />
            <p className="text-gray-500 mt-4 text-md font-medium">
              Top-rated home services for you.
            </p>
          </div>

          <Link 
            to="/services" 
            className="group flex items-center gap-2 border border-gray-100 px-6 py-2.5 rounded-xl font-bold text-sm text-gray-700 hover:border-[#4EC9B0] hover:text-[#4EC9B0] transition-all shadow-sm"
          >
            View All
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Grid - 3 Columns using the exact UI from your image */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.slice(0, 6).map((item) => (
            <ServiceCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularServices;