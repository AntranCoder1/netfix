const User = require('../models/Users.models');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
const passport = require("passport");
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client("718778022741-nqeapv7qq7no0vs77v5dv2s70jcbcdnf.apps.googleusercontent.com")

const CLIENT_URL = "http://localhost:3000/"

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (id, isAdmin) => {
    return jwt.sign({id, isAdmin}, process.env.SECRET_KEY, {
        expiresIn: maxAge
    })
};

module.exports.register = async (req, res) => {
    const newUser = new User({
        name: req.body.name,
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

        const { password, __v, email, updatedAt, createdAt, ...others } = user._doc;
        res.status(200).json({ ...others, token })
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

module.exports.googlelogin = (req, res) => {
    const { tokenId } = req.body;

    client.verifyIdToken({ idToken: tokenId, audience: "718778022741-nqeapv7qq7no0vs77v5dv2s70jcbcdnf.apps.googleusercontent.com" }).then(response => {
        const { email_verified, name, email, picture } = response.payload;

        if (email_verified) {
            User.findOne({ email }).exec((err, user) => {
                if (err) {
                    return res.status(400).json({
                        error: "Something went wrong..."
                    })
                } else {
                    if (user) {
                        const token = createToken(user._id, user.isAdmin);
                        res.cookie('account_google', token, { httpOnly: true, maxAge });
                        res.status(200).json({ user: user._id, name, email, picture, token })
                    } else {
                        let password = CryptoJS.AES.encrypt(
                            email,
                            process.env.SECRET_KEY
                        ).toString();
                        let newUser = new User({name, email, password});
                        newUser.save((err, data) => {
                            if (err) {
                                return res.status(400).json({
                                    error: "Something went wrong..."
                                })
                            }
                            const token = createToken(data._id, data.isAdmin);
                            res.cookie('account_google', token, { httpOnly: true, maxAge });
                            res.status(200).json({ user: data._id, name, email, token })
                        });
                    }
                }
            })
        }
    })
};