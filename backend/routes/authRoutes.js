import express from "express";
import { 
    registerUser, 
    loginUser, 
    verifyOTP, 
    resendOTP 
} from "../controllers/authController.js";
import { validateRegister, validateLogin } from "../middlewares/authValidator.js";

const router = express.Router();


router.post("/register", validateRegister, registerUser);
router.post("/verify-otp", verifyOTP);
router.post("/resend-otp", resendOTP);
router.post("/login", validateLogin, loginUser);

export default router;