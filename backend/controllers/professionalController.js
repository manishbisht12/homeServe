import Professional from  "../models/professionalModel.js";

export const getProfessionals = async(req, res) => {
    try {
    const { service} = req.params;
    const pros = await Professional.find({ service});
    res.json(pros);
    }catch(error){
        res.status(500).json({message : error.message});
    }
}