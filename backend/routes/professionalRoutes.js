import express from "express";
import { getProfessionals, updateProProfile, getProfessionalById } from "../controllers/professionalController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/uploadMiddleware.js";
import { validateProfessionalProfile } from "../middlewares/professionalValidator.js";

const router = express.Router();


router.get("/:service", getProfessionals);
router.get("/detail/:id", getProfessionalById);

router.post("/update-profile", protect, upload.single('image'), validateProfessionalProfile, updateProProfile);

export default router;