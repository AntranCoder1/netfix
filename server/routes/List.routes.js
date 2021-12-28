const express = require('express');
const router = express();
const List = require('../models/List.models');
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
router.get("/", verify, async (req, res) => {
    const typeQuery = req.query.type;
    const genreQuery = req.query.genre;

    let list = [];

    try {
        if (typeQuery) {
            if (genreQuery) {
                list = await List.aggregate([
                    { $sample: { size: 10 } },
                    { $match: { type: typeQuery, genre: genreQuery } },
                ]);
            } else {
                list = await List.aggregate([
                    { $sample: { size: 10 } },
                    { $match: { type: typeQuery } },
                ]);
            }
        } else {
            list = await List.aggregate([
                { $sample: { size: 10 } },
            ]);
        }
        res.status(200).json(list);
    } catch (error) {
        res.status(500).json("Internal server error");
    }
});

module.exports = router;