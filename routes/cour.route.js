const express = require('express');
const router = express.Router();

const cour=require("../models/cour");
// afficher la liste des cours 
router.get('/', async (req, res, )=> {
try {
const cours = await cours.find();
res.status(200).json(cours);
} catch (error) {
res.status(404).json({ message: error.message });
}
});

// créer un nouveau cour
router.post('/', async (req, res) => {
const nouvcour = new cour(req.body)
try {
await nouvcour.save();
res.status(200).json(nouvcour);
} catch (error) {
res.status(404).json({ message: error.message });
}
});

// chercher un cour
router.get('/:courId',async(req, res)=>{
try {
const pat = await cour.findById(req.params.courId);
res.status(200).json(pat);
} catch (error) {
res.status(404).json({ message: error.message });
}
});


module.exports = router;
