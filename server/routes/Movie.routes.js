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

router.get("/search", verify, movieControllers.searchMovie);

router.get("/randomMovie", verify, movieControllers.getMovieList);

// @routes api/movies/comment-movie/:id
// @desc patch create movie comment
// @access private
router.patch("/comment-movie/:id", verify, movieControllers.comment);

// @routes api/movies/edit-comment-movie/:id
// @desc patch update movie comment
// @access private
router.patch("/edit-comment-movie/:id", verify, movieControllers.updateComment);

// @roures api/movies/delete-comment-movie/:id
// @desc patch delete movie comment
// @access private
router.patch("/delete-comment-movie/:id", verify, movieControllers.deleteComment);

module.exports = router;