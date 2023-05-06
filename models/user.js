const mongoose = require('mongoose');
const Formation = require("./formation.js");
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: false,

    },
    lastName: {
        type: String,
        required: false,

    },

    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: false,
    },
    datenais: {
        type: String,
        required: false,
    },
    role: {
        type: String,
        enum: ["formateur", "admin", "apprenant"],
    },

    isActive: {
        type: Boolean,
        default: true,
        required: true
    },

    // avatar: {
    //     type: String,
    //     required: false
    // },

    formationID: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: Formation
        }]


},
    {
        timestamps: true,
    },
)
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(this.password, salt)
    this.password = hashedPassword
    next()
})
module.exports = mongoose.model('User', userSchema)

