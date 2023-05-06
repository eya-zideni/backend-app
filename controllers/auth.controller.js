const User = require('../models/user.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const register = async (req, res) => {
    const user = await User.findOne({ email: req.body.email }, '-password')
    if (user) return res.status(404).send({ success: false, message: "User already exists" })
    console.log(req.body)
    const nouvuser = new User(req.body)

    try {
        await nouvuser.save();
        res.status(200).json(nouvuser);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const login = async (req, res) => {
    try {
        let { email, password } = req.body
        if (!email || !password) {
            return res.status(404).send({ success: false, message: "All fields are required" })
        }
        let user = await User.findOne({
            email
        }).populate('formationID', '-password')
        if (!user) {
            return res.status(404).send({ success: false, message: "Account doesn't exists" })
        } else {
            let isCorrectPassword = await bcrypt.compare(password, user.password)
            if (isCorrectPassword) {
                delete user._doc.password
                if (!user.isActive) return res.status(200).send({
                    success:
                        false, message: 'Your account is inactive, Please contact your administrator'
                })
                const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
                    expiresIn: 86400 // 24 hours
                });

                return res.status(200).send({ user, token })
            } else {
                return res.status(404).send({
                    success: false, message:
                        "Please verify your credentials"
                })
            }
        }
    } catch (err) {
        return res.status(404).send({
            success: false, message: err.message
        })
    }
}

module.exports = { register, login }