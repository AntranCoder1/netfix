const express = require('express');
const router = express.Router();

const authControllers = require('../controllers/Auth.controllers');

// @routes api/auth/register
// @routes POST register
// @access public
router.post("/register", authControllers.register);

// @routes api/auth/login
// @routes POST login
// @access public
router.post("/login", authControllers.login);

// @routes api/auth/googlelogin
router.post("/googlelogin", authControllers.googlelogin);

// @routes api/auth/login/success
// @desc login with google
// @access public
// router.get("/login/success", (req, res) => {
//     if (req.user) {
//         res.status(200).json({
//             success: true, 
//             message: "Successfully", 
//             user: req.user,
//         });
//     }
// });

// router.get("/login/failed", (req, res) => {
//     res.status(401).json({ success: false, message: "Internal server error" });
// });

// router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

// router.get("/google/callback", passport.authenticate("google", { 
//     successRedirect: CLIENT_URL,
//     failureRedirect: "/login/failed"
// }));

module.exports = router;