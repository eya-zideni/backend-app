const express = require('express');
const { register, login } = require('../controllers/auth.controller');

const router = express.Router();

// créer un nouvel user
router.post('/register', register);

//login d'utilisateur se connecter
router.post('/login', login);

module.exports = router;