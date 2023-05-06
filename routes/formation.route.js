const express = require('express');
const { uploadFile } = require('../middleware/uploadFile');
const { verifyToken } = require('../middleware/auth-token');
const { isFormateur, isApprenant } = require('../middleware/authorized-role');
const { ajoutFormation, getListFormations, getFormationById, updateFormation, deleteFormation, registerFormation } = require('../controllers/formation.controller');

const router = express.Router();

// afficher la liste des formations 
router.get('/', getListFormations);

// créer une nouvelle formation
router.post('/', verifyToken, isFormateur, uploadFile, ajoutFormation);

// chercher une formation
router.get('/:formationId', verifyToken, getFormationById);
// modifier une formation
router.put('/:formationId', verifyToken, updateFormation);
// Supprimer une formation
router.delete('/:formationId', verifyToken, deleteFormation);

// inscription dans un formation
router.post('/:formationId', verifyToken, isApprenant, registerFormation)
module.exports = router;
