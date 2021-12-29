const User = require('../models/Users.models');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (id, isAdmin) => {
    return jwt.sign({id, isAdmin}, process.env.SECRET_KEY, {
        expiresIn: maxAge
    })
};

module.exports.register = async (req, res) => {
    const newUser = new User({
        displayName: req.body.displayName,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(
            req.body.password,
            process.env.SECRET_KEY
        ).toString(),
    });

    try {
        const user = await newUser.save();
        res.status(200).json(user);
    } catch (error) {
        // res.status(500).json({ success: false, message: "Internal server error" });
        console.log(error)
    }
};

module.exports.login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        !user && res.status(404).json("User not found");

        const validPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.SECRET_KEY
        );

        const originalPassword = validPassword.toString(CryptoJS.enc.Utf8);

        originalPassword !== req.body.password && 
            res.status(401).json("Wrong password");

        const token = createToken(user._id, user.isAdmin);
        res.cookie('jwt', token, { httpOnly: true, maxAge });
        res.status(200).json({ user: user._id, token })
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};