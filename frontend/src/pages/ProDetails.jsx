import React, { useState, useEffect } from "react"; 
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import { Star, CheckCircle2, Briefcase, Clock, Heart, MessageCircle, ChevronLeft, Calendar } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const data = [
  {
    id: "1",
    name: "Michael Rodriguez",
    role: "Master Plumber",
    rating: 4.6,
    reviews: 156,
    experience: "12 years",
    jobs: "847",
    time: "< 2 hours",
    price: 85,
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    desc: "Skilled carpenters for furniture repair and custom woodwork. Expert plumbing services for repairs, installations, and maintenance.",
    tags: ["Licensed Master Plumber", "Gas Fitting Certified", "Backflow Prevention"],
    availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  },
];

const ProDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Availability");
  
  // 2. isFavorite State define ki
  const [isFavorite, setIsFavorite] = useState(false);
  
  const pro = data.find((item) => item.id === id);

  // 3. Page load hote hi check karein ki ye pro already favorite hai ya nahi
  useEffect(() => {
    if (pro) {
      const existing = JSON.parse(localStorage.getItem("favorites")) || [];
      const alreadyAdded = existing.some((item) => item.id === pro.id);
      setIsFavorite(alreadyAdded);
    }
  }, [id, pro]);

  if (!pro) return <div className="min-h-screen flex items-center justify-center font-bold text-2xl">Professional Not Found</div>;

  const handleFavorite = () => {
    const existing = JSON.parse(localStorage.getItem("favorites")) || [];
    const alreadyAdded = existing.find((item) => item.id === pro.id);

    let updated;
    if (!alreadyAdded) {
      updated = [...existing, pro];
      setIsFavorite(true);
      toast.success("Added to Favorites!", {
      
      
    });
    } else {
      updated = existing.filter((item) => item.id !== pro.id);
      setIsFavorite(false);
     toast("Removed from Favorites", {
      icon: '💔',
    });
    }
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  return (
    <div className="bg-[#F9FAFB] min-h-screen antialiased">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-[#4EC9B0] transition-colors mb-8 font-bold text-sm"
        >
          <ChevronLeft size={20} />
          Back
        </button>

        <div className="grid lg:grid-cols-12 gap-10">
          {/* LEFT SIDEBAR */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm text-center">
              <div className="relative inline-block">
                <img
                  src={pro.image}
                  className="w-32 h-32 rounded-3xl mx-auto object-cover"
                  alt={pro.name}
                />
                <div className="absolute -bottom-2 -right-2 bg-white p-1 rounded-full shadow-md">
                  <CheckCircle2 size={20} className="text-[#4EC9B0]" fill="#F0FDF4" />
                </div>
              </div>

              <h2 className="text-2xl font-bold text-[#1e293b] mt-6">{pro.name}</h2>
              <p className="text-gray-400 font-medium text-sm mt-1">{pro.role}</p>

              <div className="flex justify-center items-center gap-2 mt-4 bg-[#F0FDF4] w-fit mx-auto px-4 py-1.5 rounded-full">
                <Star size={16} className="text-[#4EC9B0]" fill="currentColor" />
                <span className="font-bold text-[#4EC9B0]">{pro.rating}</span>
                <span className="text-gray-400 text-xs font-medium">({pro.reviews})</span>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-50 flex justify-between items-center">
                <div className="text-left">
                  <p className="text-2xl font-bold text-[#1e293b]">${pro.price}</p>
                  <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">Per Hour</p>
                </div>
                <button
                  onClick={() => navigate(`/book/${pro.id}`)}
                  className="bg-[#E9F7F5] text-[#4EC9B0] px-6 py-3 rounded-2xl font-bold text-sm hover:bg-[#4EC9B0] hover:text-white transition-all"
                >
                  Book Now →
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4">
                <button className="flex items-center justify-center gap-2 border border-gray-100 py-3 rounded-2xl font-bold text-xs text-gray-500 hover:bg-gray-50">
                  <MessageCircle size={16} /> Chat
                </button>
                
                {/* 4. Heart Icon Dynamic Color */}
                <button
                  onClick={handleFavorite}
                  className={`flex items-center justify-center gap-2 border py-3 rounded-2xl font-bold text-xs transition-all ${
                    isFavorite 
                    ? "bg-red-50 border-red-100 text-red-500" 
                    : "border-gray-100 text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  <Heart size={16} fill={isFavorite ? "currentColor" : "none"} /> 
                  {isFavorite ? "Favorite" : "Favorite"}
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-[#E5E7EB]/50 p-1.5 rounded-[1.2rem] flex gap-1">
              {["About", "Reviews (2)", "Availability"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all ${
                    activeTab === tab 
                      ? "bg-white text-gray-900 shadow-sm" 
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
              {activeTab === "Availability" && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-[#1e293b]">Available Days</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {weekDays.map((day) => {
                      const isAvailable = pro.availableDays.includes(day);
                      return (
                        <div
                          key={day}
                          className={`p-4 rounded-2xl border flex flex-col items-center gap-2 transition-all ${
                            isAvailable 
                            ? "border-[#4EC9B0] bg-white text-[#4EC9B0]" 
                            : "border-gray-100 bg-gray-50/50 text-gray-300"
                          }`}
                        >
                          <Calendar size={20} className={isAvailable ? "text-[#4EC9B0]" : "text-gray-300"} />
                          <span className="font-bold text-sm">{day}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {activeTab === "About" && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-[#1e293b]">Biography</h3>
                  <p className="text-gray-500 leading-relaxed">{pro.desc}</p>
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