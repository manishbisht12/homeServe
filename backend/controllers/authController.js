import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendEmail } from "../config/brevoEmail.js";

export const registerUser = async (req, res) => {
    try {
        const { name, email, password , role} = req.body;

        const userExists = await User.findOne({ email });

        if (userExists) {
            
            if (userExists.isVerified) {
                return res.status(400).json({ success: false, message: "User already exists and is verified." });
            } 

           
            const currentTime = new Date();
            if (userExists.otpExpires > currentTime) {
               
                return res.status(400).json({ 
                    success: false, 
                    message: "OTP already sent. Please check your email or wait until it expires to request a new one." 
                });
            }
            
           
            await User.deleteOne({ email });
        }

        
        const otp = Math.floor(1000 + Math.random() * 9000).toString();
        const otpExpires = new Date(Date.now() + 10 * 60 * 1000); 

        const emailHtml = `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
            <div style="background-color: #4F46E5; padding: 30px; text-align: center;">
                <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Welcome to ServiceBooking!</h1>
            </div>
            <div style="padding: 40px; background-color: #ffffff; line-height: 1.6; color: #333333;">
                <h2 style="margin-top: 0; color: #111827;">Verify Your Account</h2>
                <p>Hello <strong>${name}</strong>,</p>
                <p>Thank you for choosing our platform. Use this OTP to verify your account:</p>
                <div style="text-align: center; margin: 30px 0;">
                    <div style="display: inline-block; padding: 15px 40px; background-color: #F3F4F6; border-radius: 8px; font-size: 32px; font-weight: bold; color: #4F46E5; letter-spacing: 6px;">
                        ${otp}
                    </div>
                    <p style="color: #EF4444; font-size: 14px; margin-top: 15px;">
                         Valid for 10 minutes.
                    </p>
                </div>
            </div>
        </div>`;

        await sendEmail({
            toEmail: email,
            toName: name,
            subject: "Verify Your Account - ServiceBooking",
            htmlContent: emailHtml
        });

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            name,
            email,
            password: hashedPassword,
            role : role || "user",
            otp,
            otpExpires,
            isVerified: false
        });

        res.status(201).json({
            success: true,
            message: "OTP sent to your email.",
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.isVerified) {
            return res.status(400).json({ message: "Account is already verified" });
        }

        if (user.otp !== otp || user.otpExpires < Date.now()) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }

        user.isVerified = true;
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();

        res.status(200).json({ success: true, message: "Account verified successfully!" });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const resendOTP = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(404).json({ message: "User not found" });
        if (user.isVerified) return res.status(400).json({ message: "User already verified" });

        const newOtp = Math.floor(1000 + Math.random() * 9000).toString();
        user.otp = newOtp;
        user.otpExpires = new Date(Date.now() + 10 * 60 * 1000);
        await user.save();

        await sendEmail({
            toEmail: email,
            toName: user.name,
            subject: "Your New Verification Code",
            htmlContent: `<h1>Your new OTP is ${newOtp}</h1>`
        });

        res.status(200).json({ success: true, message: "New OTP sent to email" });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        if (!user.isVerified) {
            return res.status(403).json({ message: "Please verify your email first" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
          
        });

        return res.json({
            success: true,
            message: "Login Successfully",
            user: { _id: user._id, name: user.name, email: user.email, role : user.role },
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};