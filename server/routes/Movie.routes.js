const express = require('express');
const router = express();
const verify = require('../verifyToken');

const movieControllers = require('../controllers/Movie.controllers');

// @routes api/movies/
// @desc create movie
// @access private
router.post("/", verify, movieControllers.createMovie);

// @routes api/movies/:id
// @desc update movie
// @access private
router.put("/:id", verify, movieControllers.updatedMovie);

// @routes api/movies/:id
// @desc delete movie
// @access private
router.delete("/:id", verify, movieControllers.deletedMovie);

// @routes api/movies/find/:id
// @desc find movie
// @access private
router.get("/find/:id", verify, movieControllers.findMovie);

// @routes api/movies/
// @desc find all movie
// @access pivate
router.get("/", verify, movieControllers.getAllMovie);

// @routes api/movies/random?type=series
// @desc get random movie
// @access private
router.get("/random", verify, movieControllers.getRandom);

module.exports = router;