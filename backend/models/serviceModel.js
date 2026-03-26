import mongoose from "mongoose";

const serviceSchema =  new mongoose.Schema(
    {
        title : String,
        desc : String,
        price : String,
        rating : Number,
        reviews : Number,
        Image : String,

    },
    { timestamps : true}
);

export default mongoose.model("Service", serviceSchema);