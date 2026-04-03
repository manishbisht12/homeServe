import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Upload, X } from "lucide-react";

const ProProfileForm = () => {
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null); 
  
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    service: "plumbing",
    experience: "",
    desc: "",
    availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], 
  });

  const allDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  // 1. Fetch Existing Profile (Data Persistence)
  // Isse page refresh par data gayab nahi hoga, pehle se bhara milega
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/professionals/my-profile", { withCredentials: true });
        if (data.profile) {
          setFormData(data.profile);
          setPreview(data.profile.image); 
        }
      } catch (err) {
        console.log("No existing profile found");
      }
    };
    fetchProfile();
  }, []);

  // 2. Day Toggle Logic
  const toggleDay = (day) => {
    setFormData(prev => ({
      ...prev,
      availableDays: prev.availableDays.includes(day)
        ? prev.availableDays.filter(d => d !== day)
        : [...prev.availableDays, day]
    }));
  };

  // 3. Image Preview Logic
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file)); // Blob URL banata hai
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    // Saari fields append karein
    Object.keys(formData).forEach(key => {
      if (key === 'availableDays') {
        // Array ko handle karne ke liye individual append ya stringify
        formData.availableDays.forEach(day => data.append("availableDays[]", day));
      } else {
        data.append(key, formData[key]);
      }
    });

    if (imageFile) data.append("image", imageFile);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/professionals/update-profile",
        data,
        { withCredentials: true, headers: { "Content-Type": "multipart/form-data" } }
      );
      if (response.data.success) {
        toast.success("Profile Updated Successfully!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Update Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-xl max-w-4xl mx-auto">
      <div className="border-b pb-6 mb-6">
        <h2 className="text-3xl font-black text-gray-900">Business Profile</h2>
        <p className="text-gray-500 font-medium">Update your professional details and availability.</p>
      </div>

      {/* Profile Image Section with Preview */}
      <div className="flex flex-col items-center justify-center">
        <div className="relative group">
          <div className="w-32 h-32 rounded-3xl bg-gray-100 border-2 border-dashed border-gray-300 overflow-hidden flex items-center justify-center">
            {preview ? (
              <img src={preview} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <Upload className="text-gray-400" />
            )}
          </div>
          <input type="file" id="img-upload" className="hidden" accept="image/*" onChange={handleImageChange} />
          <label htmlFor="img-upload" className="absolute -bottom-2 -right-2 bg-[#4EC9B0] text-white p-2 rounded-xl cursor-pointer shadow-lg hover:scale-110 transition-transform">
            <Upload size={16} />
          </label>
        </div>
        <p className="text-xs font-bold text-gray-400 mt-4 uppercase tracking-widest">Business Logo / Photo</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-2">Full Name</label>
          <input 
            type="text" 
            value={formData.name}
            className="w-full p-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#4EC9B0] transition-all outline-none"
            placeholder="e.g. Manish Bisht"
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />
        </div>

        <div>
          <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-2">Service Category</label>
          <select 
            value={formData.service}
            className="w-full p-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#4EC9B0] outline-none appearance-none"
            onChange={(e) => setFormData({...formData, service: e.target.value})}
          >
            <option value="plumbing">Plumbing</option>
            <option value="electrical">Electrical</option>
            <option value="cleaning">Cleaning</option>
            <option value="carpentry">Carpentry</option>
            <option value="painting">Painting</option>
            <option value="repair">Repair</option>
          </select>
        </div>
      </div>

      {/* Availability Section - Crucial Improvement */}
      <div>
        <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-3">Work Availability</label>
        <div className="flex flex-wrap gap-2">
          {allDays.map(day => (
            <button
              key={day}
              type="button"
              onClick={() => toggleDay(day)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                formData.availableDays.includes(day) 
                ? "bg-[#4EC9B0] text-white shadow-md shadow-[#4EC9B0]/20" 
                : "bg-gray-100 text-gray-400 hover:bg-gray-200"
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <input 
          type="number" 
          value={formData.price}
          placeholder="Price per Hour (₹)"
          className="w-full p-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#4EC9B0] outline-none"
          onChange={(e) => setFormData({...formData, price: e.target.value})}
        />
        <input 
          type="text" 
          value={formData.experience}
          placeholder="Experience (e.g. 5 Years)"
          className="w-full p-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#4EC9B0] outline-none"
          onChange={(e) => setFormData({...formData, experience: e.target.value})}
        />
      </div>

      <textarea 
        rows="4"
        value={formData.desc}
        className="w-full p-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#4EC9B0] outline-none"
        placeholder="Describe your skills and previous work..."
        onChange={(e) => setFormData({...formData, desc: e.target.value})}
      ></textarea>

      <button 
        type="submit"
        disabled={loading}
        className="w-full bg-[#1b9e84] text-white py-5 rounded-[1.5rem] font-black text-lg shadow-xl hover:bg-[#058f73] transform hover:-translate-y-1 transition-all disabled:opacity-50"
      >
        {loading ? "Processing..." : "Update Professional Profile"}
      </button>
    </form>
  );
};

export default ProProfileForm;