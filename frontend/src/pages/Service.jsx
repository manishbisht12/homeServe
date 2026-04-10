import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ServiceCard from "../components/ServiceCard"; // Import individual card
import { Search, SlidersHorizontal } from "lucide-react";

const services = [
  { id: 1, title: "Plumbing", desc: "Expert plumbing services for repairs, installations, and maintenance", price: "$80-150", rating: "4.8", reviews: "234", pros: "--", img: "https://images.unsplash.com/photo-1581578731548-c64695cc6952" },
  { id: 2, title: "Electrical", desc: "Licensed electricians for all your electrical needs and safety", price: "$90-180", rating: "4.9", reviews: "189", pros: "--", img: "https://images.unsplash.com/photo-1621905251918-48416bd8575a" },
  { id: 3, title: "Cleaning", desc: "Professional cleaning services for homes and offices", price: "$60-120", rating: "4.7", reviews: "312", pros: "--", img: "https://images.unsplash.com/photo-1581579185169-22f6f7b2b3c1" },
  { id: 4, title: "Carpentry", desc: "Skilled carpenters for furniture repair and custom woodwork", price: "$70-140", rating: "4.6", reviews: "156", pros: "--", img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e" },
  { id: 5, title: "Painting", desc: "Professional painters for interior and exterior projects", price: "$100-250", rating: "4.8", reviews: "201", pros: "--", img: "https://images.unsplash.com/photo-1598300053653-3b5e3f7edc2f" },
  { id: 6, title: "Repair", desc: "Heating, ventilation, and air conditioning experts", price: "$120-200", rating: "4.7", reviews: "178", pros: "--", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c" },
];

const ServicePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [proCounts, setProCounts] = useState({});

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const results = await Promise.all(
          services.map((service) =>
            axios
              .get(`http://localhost:5000/api/professionals/${service.title.toLowerCase()}`)
              .then((res) => ({ service: service.title, count: res.data.length }))
              .catch(() => ({ service: service.title, count: 0 }))
          )
        );

        const counts = results.reduce((acc, { service, count }) => {
          acc[service] = count;
          return acc;
        }, {});

        setProCounts(counts);
      } catch (error) {
        console.error("Failed to load pro counts", error);
      }
    };

    fetchCounts();
  }, []);

  // Filtering Logic
  const filteredServices = services.filter((service) =>
    service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.desc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F9FAFB] antialiased">
      <Navbar />
      
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* --- FILTER & GRID SECTION --- */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-wrap items-center justify-between mb-10 gap-4">
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-200 text-sm font-bold text-gray-600 cursor-pointer hover:bg-gray-50 transition-colors">
            <SlidersHorizontal size={16} /> Filters
          </div>
          <div className="text-sm text-gray-400 font-medium">
            Showing <span className="text-gray-900 font-bold">{filteredServices.length}</span> results
          </div>
        </div>

        {/* Dynamic Grid */}
        {filteredServices.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((item) => (
              <ServiceCard
                key={item.id}
                item={{
                  ...item,
                  pros: proCounts[item.title] !== undefined ? `${proCounts[item.title]} ${proCounts[item.title] === 1 ? "pro" : "pros"}` : item.pros,
                }}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No services found matching "{searchTerm}"</p>
          </div>
        )}
      </main>

      {/* --- CTA SECTION --- */}
      <section className="bg-white py-20 mt-12 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-6 text-center bg-[#4EC9B0]/5 rounded-[3rem] py-12 border border-[#4EC9B0]/10">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4">
            Don't see what you're looking for?
          </h2>
          <button className="bg-[#161617] text-white px-8 py-4 rounded-2xl font-bold hover:bg-black transition-all shadow-lg">
            Request a Service
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServicePage;