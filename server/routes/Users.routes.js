const express = require('express');
const router = express.Router();
const verify = require('../verifyToken');

const userControllers = require('../controllers/Users.controllers');

// @routes api/users/:id
// @desc PUT users
// @access private
router.put("/:id", verify, userControllers.update);

// @routes api/users/:id
// @desc DELETE user
// @access private
router.delete('/:id', verify, userControllers.delete);

// @routes api/users/find/:id
// @desc GET user
// @access private
router.get("/find/:id", userControllers.findUser);

// @routes api/users/
// @desc GET all user
// @access private
router.get("/", verify, userControllers.getUser);

// @routes api/users/stats
// @desc GET stats user
// @access private
router.get("/stats", userControllers.statsUser);

module.exports = router;