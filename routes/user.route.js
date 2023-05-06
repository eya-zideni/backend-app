const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
require('dotenv').config()

//affichier liste des utilisateur 
router.get('/', async (req, res,) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

//affichier liste des formateur par formation

router.get('/formateur', async (req, res) => {
    try {
        console.log(req.query)
        const users = await User.find({ role: req.query.role }).populate('formationID').exec()
        return res.status(200).send(users.filter(user => user.formationID.type === req.query.formation))
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});



// chercher un user
router.get('/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// modifier un user
router.put('/:userId', async (req, res) => {
    const { email, password, firstName, lastName, datenais, phone } = req.body;

    const id = req.params.userId;
    try {
        const user1 = {
            email: email, lastName: lastName, firstName: firstName, password: password, datenais: datenais, phone: phone, _id: id
        };
        await User.findByIdAndUpdate(id, user1);
        res.json(user1);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});


// Supprimer un user
router.delete('/:userId', async (req, res) => {
    const id = req.params.userId;
    await User.findByIdAndDelete(id);
    res.json({ message: "user deleted successfully." });
});



module.exports = router;