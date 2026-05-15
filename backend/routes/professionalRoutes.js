import express from "express";
import { getProfessionals, updateProProfile, getProfessionalById, getProProfile } from "../controllers/professionalController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/uploadMiddleware.js";
import { validateProfessionalProfile, normalizeArrays } from "../middlewares/professionalValidator.js";

const router = express.Router();


router.get("/my-profile", protect, getProProfile);
router.get("/detail/:id", getProfessionalById);
router.get("/:service", getProfessionals);

router.post("/update-profile", protect, upload.single('image'), normalizeArrays, validateProfessionalProfile, updateProProfile);

export default router;