import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import ProfessionalCard from "../components/ProfessionalCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ChevronLeft, SlidersHorizontal, Loader2 } from "lucide-react";

const Professionals = () => {
  const { serviceName } = useParams();
  const [pros, setPros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortType, setSortType] = useState("rating");

  useEffect(() => {
    const fetchProfessionals = async () => {
      setLoading(true);
      try {
        // Convert URL slug back to service name (house-cleaning → house cleaning)
        const serviceQuery = serviceName.replace(/-/g, " ");
        const { data } = await axios.get(`http://localhost:5000/api/professionals/${serviceQuery}`);
        setPros(data);
      } catch (error) {
        console.error("Error fetching professionals:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfessionals();
  }, [serviceName]);

  const sortedPros = [...pros].sort((a, b) => {
    if (sortType === "rating") return b.rating - a.rating;
    if (sortType === "price") return a.price - b.price;
    return 0;
  });

  return (
    <div className="min-h-screen bg-[#F9FAFB] antialiased">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        
        <Link to="/services" className="flex items-center gap-2 text-gray-500 hover:text-[#4EC9B0] mb-6 font-medium text-sm w-fit">
          <ChevronLeft size={18} /> Back to Services
        </Link>

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] capitalize">
              {serviceName} <span className="text-[#4EC9B0]">Pros</span>
            </h1>
            <p className="text-gray-500 mt-2 font-medium">
              Showing {pros.length} verified experts for your needs.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-2xl border border-gray-100 shadow-sm">
            <SlidersHorizontal size={16} className="text-gray-400" />
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

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-[#4EC9B0]" size={40} />
          </div>
        ) : (
          <>
            <div className="grid lg:grid-cols-2 gap-8">
              {sortedPros.map((pro) => (
                <ProfessionalCard key={pro._id} pro={pro} />
              ))}
            </div>

            {sortedPros.length === 0 && (
              <div className="text-center py-20 bg-white rounded-[2.5rem] border border-dashed border-gray-200">
                <p className="text-gray-400 font-medium text-lg">No professionals found for "{serviceName}" yet.</p>
              </div>
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Professionals;