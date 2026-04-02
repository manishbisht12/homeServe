import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
        },
        email:{
            type : String,
            required : true,
            unique : true,
        },
        password:{
            type: String,
            required: true,
        },
        role : {
             type: String,
             enum : ["user", "pro"],
             default : "user"
        },
        otp:{
            type: String,
        },
        isVerified: {
            type : Boolean,
            default : false,
        },
        otpExpires : {
             type : Date,
             default: () => new Date(Date.now() + 10 * 60 * 1000),
        },
    },
    {timestamps: true}
);

const User = mongoose.model("User", userSchema);

export default User;