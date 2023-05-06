const mongoose = require("mongoose");
const apprenantSchema = mongoose.Schema({
    nomapp: { type: String, required: false },
    prenomapp: { type: String, required: false },
    // photo :{ type: String, required: false },
    email: { type: String, required: false },
    password: { type: String, required: false },
    phone: { type: String, required: false },
    datenais: { type: String, required: false },

    isActive: {
        type: Boolean,
        default: true,
        required: false
    },



})
module.exports = mongoose.model('apprenant', apprenantSchema)