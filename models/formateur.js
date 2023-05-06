const mongoose = require("mongoose")
const Formation = require("./formation.js");
const formateurSchema = mongoose.Schema({
    nom: { type: String, required: false },
    prenom: { type: String, required: false },
    // avatar :{ type: String, required: false },
    email: { type: String, required: false },
    password: { type: String, required: false },
    phone: { type: Number, required: false },
    datenais: { type: String, required: false },
    isActive: {
        type: Boolean,
        default: true,
        required: false
    },

    formationID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Formation
    },



})
module.exports = mongoose.model('formateur', formateurSchema)
