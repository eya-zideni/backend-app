const express = require('express');
const router = express.Router();

const formateur = require("../models/formateur")
// afficher la liste des formateur 
router.get('/', async (req, res,) => {
    try {
        const formateurs = await formateur.find().populate("formationID").exec();

        res.status(200).json(formateurs);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});
// créer un nouvel formateurs
router.post('/', async (req, res) => {
    const nouvformateur = new formateur(req.body)
    try {
        await nouvformateur.save();
        res.status(200).json(nouvformateur);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// chercher un formateur
router.get('/:formateurId', async (req, res) => {
    try {
        const pat = await formateur.findById(req.params.formateurId);
        res.status(200).json(pat);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});
// modifier un formateur
router.put('/:formateurId', async (req, res) => {
    const { nom, prenom, email, datenais, phone, password } = req.body;

    const id = req.params.formateurId;
    try {
        const far1 = {
            nom: nom, prenom: prenom, datenais: datenais, phone: phone, email: email, password: password, _id: id
        };
        await formateur.findByIdAndUpdate(id, far1);
        res.json(far1);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});
// Supprimer un formateur
router.delete('/:formateurId', async (req, res) => {
    const id = req.params.formateurId;
    await formateur.findByIdAndDelete(id);
    res.json({ message: "formateur deleted successfully." });
});


module.exports = router;
