const Formation = require("../models/formation");

const getListFormations = async (req, res,) => {
    try {
        const formation = await Formation.find().populate('formateurID', '-password').populate('apprenantID', 'firstName');
        res.status(200).json(formation);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const ajoutFormation = async (req, res) => {
    const formateurID = req.userId;
    console.log(req.userId);
    const { nom, desc } = req.body;
    const files = req.files.file.map(f => f.filename)
    const nouvformation = new Formation({ nom, files, desc, formateurID })
    try {
        await nouvformation.save();
        res.status(200).json(nouvformation);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getFormationById = async (req, res) => {
    try {
        const pat = await Formation.findById(req.params.formationId);
        res.status(200).json(pat);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const updateFormation = async (req, res) => {
    const { nom, description, files } = req.body;

    const id = req.params.formationId;
    try {
        const updateFormation = { nom, description, files };
        await Formation.findByIdAndUpdate(id, updateFormation);
        res.json(format);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const deleteFormation = async (req, res) => {
    const id = req.params.formationId;
    await Formation.findByIdAndDelete(id);
    res.json({ message: "formation deleted successfully." });
}

const registerFormation = async (req, res) => {
    try {
        const formation = await Formation.findById(req.params.formationId);
        await formation.apprenantID.push(req.userId);
        await formation.save();
        res.json(({ message: "Enregistrement avec succés!" }))
    } catch (error) {
        res.json({ message: error.message })
    }
}
module.exports = { getListFormations, ajoutFormation, getFormationById, updateFormation, deleteFormation, registerFormation }