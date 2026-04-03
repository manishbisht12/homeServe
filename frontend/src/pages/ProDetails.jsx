import React, { useState, useEffect } from "react"; 
import axios from "axios";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import { Star, CheckCircle2, ChevronLeft, Calendar, Heart, MessageCircle, Clock, ShieldCheck } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ProDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // States
  const [pro, setPro] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Availability");
  const [isFavorite, setIsFavorite] = useState(false);

  const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  // 1. Fetch Real Data from Backend
  useEffect(() => {
    const fetchProDetails = async () => {
      try {
        setLoading(true);
        // Aapka backend route: /detail/:id
        const { data } = await axios.get(`http://localhost:5000/api/professionals/detail/${id}`);
        setPro(data);
        
        // Favorite check (Local Storage)
        const existing = JSON.parse(localStorage.getItem("favorites")) || [];
        const alreadyAdded = existing.some((item) => item._id === data._id);
        setIsFavorite(alreadyAdded);
      } catch (error) {
        toast.error("Failed to load professional details");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProDetails();
  }, [id]);

  // 2. Handle Favorite Logic
  const handleFavorite = () => {
    if (!pro) return;
    const existing = JSON.parse(localStorage.getItem("favorites")) || [];
    const alreadyAdded = existing.find((item) => item._id === pro._id);

    let updated;
    if (!alreadyAdded) {
      updated = [...existing, pro];
      setIsFavorite(true);
      toast.success("Added to Favorites!");
    } else {
      updated = existing.filter((item) => item._id !== pro._id);
      setIsFavorite(false);
      toast("Removed from Favorites", { icon: '💔' });
    }
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4EC9B0]"></div>
    </div>
  );

  if (!pro) return <div className="min-h-screen flex items-center justify-center font-bold text-2xl">Professional Not Found</div>;

  return (
    <div className="bg-[#F9FAFB] min-h-screen antialiased">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-[#4EC9B0] transition-colors mb-8 font-bold text-sm"
        >
          <ChevronLeft size={20} /> Back
        </button>

        <div className="grid lg:grid-cols-12 gap-10">
          {/* LEFT SIDEBAR */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm text-center sticky top-32">
              <div className="relative inline-block">
                <img
                  src={pro.image || "https://via.placeholder.com/150"}
                  className="w-32 h-32 rounded-3xl mx-auto object-cover border-4 border-gray-50"
                  alt={pro.name}
                />
                <div className="absolute -bottom-2 -right-2 bg-white p-1 rounded-full shadow-md">
                  <CheckCircle2 size={20} className="text-[#4EC9B0]" fill="#F0FDF4" />
                </div>
              </div>

              <h2 className="text-2xl font-bold text-[#1e293b] mt-6">{pro.name}</h2>
              <p className="text-[#4EC9B0] font-bold text-xs uppercase tracking-widest mt-1">
                {pro.service}
              </p>

              <div className="flex justify-center items-center gap-2 mt-4 bg-[#F0FDF4] w-fit mx-auto px-4 py-1.5 rounded-full">
                <Star size={16} className="text-[#4EC9B0]" fill="currentColor" />
                <span className="font-bold text-[#4EC9B0]">{pro.rating || 0}</span>
                <span className="text-gray-400 text-xs font-medium">({pro.reviews || 0} reviews)</span>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-50 flex justify-between items-center">
                <div className="text-left">
                  <p className="text-2xl font-bold text-[#1e293b]">₹{pro.price}</p>
                  <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">Per Hour</p>
                </div>
                <button
                  onClick={() => navigate(`/book/${pro._id}`)}
                  className="bg-[#4EC9B0] text-white px-6 py-3 rounded-2xl font-bold text-sm hover:bg-[#3db39a] shadow-lg shadow-[#4EC9B0]/20 transition-all"
                >
                  Book Now
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4">
                <button className="flex items-center justify-center gap-2 border border-gray-100 py-3 rounded-2xl font-bold text-xs text-gray-500 hover:bg-gray-50 transition-all">
                  <MessageCircle size={16} /> Chat
                </button>
                <button
                  onClick={handleFavorite}
                  className={`flex items-center justify-center gap-2 border py-3 rounded-2xl font-bold text-xs transition-all ${
                    isFavorite 
                    ? "bg-red-50 border-red-100 text-red-500" 
                    : "border-gray-100 text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  <Heart size={16} fill={isFavorite ? "currentColor" : "none"} /> 
                  {isFavorite ? "Saved" : "Save"}
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-gray-100/50 p-1.5 rounded-2xl flex gap-1">
              {["About", "Availability", "Reviews"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${
                    activeTab === tab 
                      ? "bg-white text-gray-900 shadow-sm" 
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm min-h-[400px]">
              {activeTab === "About" && (
                <div className="space-y-8 animate-in fade-in duration-500">
                  <div>
                    <h3 className="text-xl font-bold text-[#1e293b] mb-4">Biography</h3>
                    <p className="text-gray-500 leading-relaxed text-lg">{pro.desc || "No description provided."}</p>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-gray-50 p-4 rounded-2xl">
                      <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Experience</p>
                      <p className="font-bold text-gray-800">{pro.experience || "N/A"}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-2xl">
                      <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Jobs Done</p>
                      <p className="font-bold text-gray-800">{pro.jobs || "0"}+</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-2xl">
                      <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Response</p>
                      <p className="font-bold text-gray-800">{pro.time || "< 2 hours"}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-[#1e293b] mb-3 uppercase tracking-widest">Specializations</h3>
                    <div className="flex flex-wrap gap-2">
                      {pro.tags?.map((tag, i) => (
                        <span key={i} className="bg-[#4EC9B0]/5 text-[#4EC9B0] px-4 py-2 rounded-xl text-xs font-bold border border-[#4EC9B0]/10">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "Availability" && (
                <div className="space-y-6 animate-in fade-in duration-500">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-[#F0FDF4] rounded-lg">
                       <Calendar className="text-[#4EC9B0]" size={20} />
                    </div>
                    <h3 className="text-xl font-bold text-[#1e293b]">Weekly Schedule</h3>
                  </div>
                  <p className="text-gray-400 text-sm mb-6">Green indicates the days this professional is available for bookings.</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {weekDays.map((day) => {
                      const isAvailable = pro.availableDays?.includes(day);
                      return (
                        <div
                          key={day}
                          className={`p-5 rounded-[1.5rem] border flex flex-col items-center gap-3 transition-all duration-300 ${
                            isAvailable 
                            ? "border-[#4EC9B0] bg-[#4EC9B0]/5 text-[#4EC9B0] shadow-sm shadow-[#4EC9B0]/10" 
                            : "border-gray-100 bg-gray-50/50 text-gray-300"
                          }`}
                        >
                          <span className={`text-[10px] font-black uppercase tracking-tighter ${isAvailable ? "text-[#4EC9B0]" : "text-gray-300"}`}>
                            {isAvailable ? "Available" : "Off Day"}
                          </span>
                          <span className="font-bold text-sm">{day}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {activeTab === "Reviews" && (
                <div className="flex flex-col items-center justify-center h-full text-gray-400 py-10">
                   <MessageCircle size={48} className="mb-4 opacity-20" />
                   <p className="font-medium text-lg">No reviews yet for this professional.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProDetails;