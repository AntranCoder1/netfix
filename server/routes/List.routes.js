const express = require('express');
const router = express();
const verify = require('../verifyToken');

const listControllers = require('../controllers/List.controllers');

// @routes api/lists
// @desc create a new list movie
// @access private
router.post("/", verify, listControllers.createListMovie);

// @routes api/lists/:id
// @desc updated list movie
// @access private
router.put("/:id", verify, listControllers.updatedListMovie);

// @routes api/list/:id
// @desc deleted list movie
// @access private
router.delete("/:id", verify, listControllers.deletedListMovie);

// @routes api/lists
// @desc get lists movie
// @access private
router.get("/", verify, listControllers.getListMovie);

// @route api/lists
// @desc get new list movie
// @access private
router.get("/", verify, listControllers.getNewList);

module.exports = router;