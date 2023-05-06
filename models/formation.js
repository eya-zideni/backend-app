const mongoose = require("mongoose");
// const Formateur =require("./formateur.js");

const formationSchema = mongoose.Schema({
    nom: { type: String, required: false, },
    description: { type: String, required: false, },
    files: [{ type: String, required: false, }],
    formateurID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    apprenantID: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
})
module.exports = mongoose.model('formation', formationSchema)