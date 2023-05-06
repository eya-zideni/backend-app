const express = require('express');
const router = express.Router();

const apprenant=require("../models/apprenant")
// afficher la liste des apprenant 
router.get('/', async (req, res, )=> {
try {
const apprenants = await apprenant.find();
res.status(200).json(apprenants);
} catch (error) {
res.status(404).json({ message: error.message });
}
});
// créer un nouvel apprenants
router.post('/', async (req, res) => {
const nouvapprenant = new apprenant(req.body)
try {
await nouvapprenant.save();
res.status(200).json(nouvapprenant);
} catch (error) {
res.status(404).json({ message: error.message });
}
});

// chercher un apprenant
router.get('/:apprenantId',async(req, res)=>{
try {
const pat = await apprenant.findById(req.params.apprenantId);
res.status(200).json(pat);
} catch (error) {
res.status(404).json({ message: error.message });
}
});
// modifier un apprenant
router.put('/:apprenantId', async (req, res)=> {
const {nomapp,prenomapp,email,datenais,phone,password} = req.body;

const id = req.params.apprenantId;
try {
const app1 = { 
    nomapp:nomapp,prenomapp:prenomapp,datenais:datenais,phone:phone,email:email,password:password, _id:id };
await apprenant.findByIdAndUpdate(id, app1);
res.json(app1);
} catch (error) {
res.status(404).json({ message: error.message });
}
});
// Supprimer un apprenant
router.delete('/:apprenantId', async (req, res)=> {
const id = req.params.apprenantId;
await apprenant.findByIdAndDelete(id);
res.json({ message: "apprenant deleted successfully." });
});


module.exports = router;
