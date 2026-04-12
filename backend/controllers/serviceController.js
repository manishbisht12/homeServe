import Service from "../models/serviceModel.js";

export const getServices = async (req, res)=> {
    try{
        const services =  await Service.find();
        res.json(services);
    }catch(error){
        res.status(500).json({ success: false, message: error.message });
    }
}

export const getServiceById = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) {
            return res.status(404).json({ success: false, message: "Service not found" });
        }
        res.json(service);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};