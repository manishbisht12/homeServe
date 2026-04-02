import Professional from "../models/professionalModel.js";

// ================= CREATE OR UPDATE PRO PROFILE =================
export const updateProProfile = async (req, res) => {
  try {
    const { name, role, price, desc, experience, service, time, tags } = req.body;

    const imageUrl = req.file ? req.file.path : req.body.image;

    
    const profile = await Professional.findOneAndUpdate(
      { user: req.user._id }, 
      {
        user: req.user._id,
        name,
        role,
        price,
        image : imageUrl,
        desc,
        experience,
        service: service.toLowerCase(),
        time: time || "< 2 hours",
        tags: tags || [],
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