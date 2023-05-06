const User = require("../models/user");

const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId);
        if (user.role === "admin") {
            next();
            return;
        } else {
            res.status(403).send({ message: "Require Admin Role!" });
            return;
        }
    } catch (error) {
        res.status(500).send({ message: err });
    }
};

const isFormateur = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId);
        if (user.role === "formateur") {
            next();
            return;
        } else {
            res.status(403).send({ message: "Require Formateur Role!" });
            return;
        }
    } catch (error) {
        res.status(500).send({ message: err });
    }
};

const isApprenant = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId);
        if (user.role === "apprenant") {
            next();
            return;
        } else {
            res.status(403).send({ message: "Require Formateur Role!" });
            return;
        }
    } catch (error) {
        res.status(500).send({ message: err });
    }
};
module.exports = { isAdmin, isFormateur, isApprenant };