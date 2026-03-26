import express  from "express";
import { getProfessionals } from "../controllers/professionalController.js";

const router =  express.Router();

router.get("/:service",  getProfessionals);

export default router;



