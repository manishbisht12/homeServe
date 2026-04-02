import express from "express";
import { getProfessionals, updateProProfile } from "../controllers/professionalController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();


router.get("/:service", getProfessionals);

router.post("/update-profile", protect, updateProProfile);

export default router;