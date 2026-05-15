import Professional from "../models/professionalModel.js";

// ================= CREATE OR UPDATE PRO PROFILE =================
export const updateProProfile = async (req, res) => {
  try {
    const { name, role, price, desc, experience, service, time, tags, availableDays } = req.body;

    const imageUrl = req.file ? req.file.path : req.body.image;

    
    // Handle arrays if they come as single strings from FormData
    const formattedAvailableDays = Array.isArray(availableDays) 
      ? availableDays 
      : availableDays ? [availableDays] : [];
    
    const formattedTags = Array.isArray(tags) 
      ? tags 
      : tags ? [tags] : [];

    const profile = await Professional.findOneAndUpdate(
      { user: req.user._id }, 
      {
        user: req.user._id,
        name,
        role: role || service,
        price,
        image : imageUrl,
        desc,
        experience,
        service: service.toLowerCase(),
        time: time || "< 2 hours",
        tags: formattedTags,
        availableDays: formattedAvailableDays
      },
      { new: true, upsert: true } 
    );

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      profile,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ================ GET LOGGED-IN PRO PROFILE =================
export const getProProfile = async (req, res) => {
  try {
    const profile = await Professional.findOne({ user: req.user._id });
    if (!profile) {
      return res.status(200).json({ success: true, profile: null });
    }
    res.status(200).json({ success: true, profile });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ================ GET PRO BY ID =================
export const getProfessionalById = async (req, res) => {
  try {
    const pro = await Professional.findById(req.params.id);
    if (!pro) {
      return res.status(404).json({ success: false, message: "Professional not found" });
    }
    res.json(pro);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ================= GET PROS BY SERVICE TYPE =================
export const getProfessionals = async (req, res) => {
  try {
    const { service } = req.params;
    // Handle both formats: "house-cleaning" (URL slug) and "house cleaning" (space)
    const normalizedService = service.toLowerCase().replace(/-/g, " ");
   
    const pros = await Professional.find({ service: normalizedService });
    res.json(pros);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};