import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProfessionalCard from "../components/ProfessionalCard";
import { HeartOff } from "lucide-react"; 
import toast from "react-hot-toast";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(data);
  }, []);

  const removeFavorite = (id) => {
    const updated = favorites.filter((item) => item.id !== id);
    setFavorites(updated);
    toast("Removed from Favorites", {
      icon: '💔',
    });
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        <div className="flex flex-col mb-10">
          <h1 className="text-4xl font-black text-[#1e293b] mb-2">
            Your Favorites <span className="text-red-500">❤️</span>
          </h1>
          <p className="text-gray-400 font-medium">Manage your shortlisted top professionals</p>
        </div>

        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 bg-white rounded-[3rem] border border-dashed border-gray-200">
            <div className="bg-gray-50 p-6 rounded-full mb-4">
              <HeartOff size={40} className="text-gray-300" />
            </div>
            <p className="text-gray-400 font-bold text-lg">No favorites added yet</p>
            <button 
              onClick={() => window.history.back()}
              className="mt-4 text-[#4EC9B0] font-bold hover:underline"
            >
              Browse Professionals
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {favorites.map((pro) => (
              <div key={pro.id} className="relative group">
                {/* Remove Cross Button */}
                <button
                  onClick={() => removeFavorite(pro.id)}
                  className="absolute top-4 right-4 z-10 bg-white/80 backdrop-blur-md p-2 rounded-full text-red-500 shadow-sm hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                  title="Remove from favorites"
                >
                  <HeartOff size={16} />
                </button>
                
                <ProfessionalCard pro={pro} />
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Favorites;