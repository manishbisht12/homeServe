import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import ProfessionalCard from "../components/ProfessionalCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ChevronLeft, SlidersHorizontal } from "lucide-react";

const professionalsData = [
  {
    id: "1",
    name: "Michael Rodriguez",
    role: "Master Plumber",
    rating: 4.9,
    reviews: 156,
    desc: "Certified master plumber with over a decade of experience in residential and commercial plumbing systems.",
    experience: "12 years",
    jobs: "847 jobs",
    time: "< 2 hours",
    price: 85,
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    tags: ["Licensed Master Plumber", "Gas Fitting Certified"],
  },
  {
    id: "2",
    name: "Lisa Anderson",
    role: "Senior Plumber",
    rating: 4.7,
    reviews: 89,
    desc: "Reliable plumber with expertise in emergency repairs, maintenance, and full bathroom renovations.",
    experience: "7 years",
    jobs: "512 jobs",
    time: "< 3 hours",
    price: 75,
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    tags: ["Licensed Plumber", "Water Heater Specialist"],
  },
];

const Professionals = () => {
  const { serviceName } = useParams();
  const [sortType, setSortType] = useState("rating");

  // 🔥 Sorting logic
  const sortedPros = [...professionalsData].sort((a, b) => {
    if (sortType === "rating") return b.rating - a.rating;
    if (sortType === "price") return a.price - b.price;
    return 0;
  });

  return (
    <div className="min-h-screen bg-[#F9FAFB] antialiased">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        
        {/* Breadcrumb / Back Button */}
        <Link 
          to="/services" 
          className="flex items-center gap-2 text-gray-500 hover:text-[#4EC9B0] transition-colors mb-6 font-medium text-sm w-fit"
        >
          <ChevronLeft size={18} />
          Back to Services
        </Link>

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] capitalize">
              {serviceName} <span className="text-[#4EC9B0]">Pros</span>
            </h1>
            <p className="text-gray-500 mt-2 font-medium">
              Showing {professionalsData.length} verified experts for your needs.
            </p>
          </div>

          {/* Sort Filter UI */}
          <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-2xl border border-gray-100 shadow-sm">
            <SlidersHorizontal size={16} className="text-gray-400" />
            <span className="text-sm font-bold text-gray-600">Sort by:</span>
            <select
              value={sortType}
              onChange={(e) => setSortType(e.target.value)}
              className="outline-none text-sm font-bold text-[#0F172A] bg-transparent cursor-pointer"
            >
              <option value="rating">Highest Rated</option>
              <option value="price">Lowest Price</option>
            </select>
          </div>
        </div>

        {/* Professionals Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {sortedPros.map((pro) => (
            <ProfessionalCard key={pro.id} pro={pro} />
          ))}
        </div>

        {/* Empty State (Optional) */}
        {sortedPros.length === 0 && (
          <div className="text-center py-20 bg-white rounded-[2.5rem] border border-dashed border-gray-200">
            <p className="text-gray-400 font-medium text-lg">No professionals found for this category yet.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Professionals;