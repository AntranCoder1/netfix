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

// @routes api/movies/:id/like or api/movies/:id/dislike
// @desc put like movie
// @access private
router.put("/:id/like", verify, movieControllers.feelMovie);

// @routes api/movies/like/:id
// @desc like movies
// @access private
router.patch("/like/:id", verify, movieControllers.likeMovie);

// @routes api/movies/dislike/:id
// @desc dislike movies
// @access private
router.patch("/dislike/:id", verify, movieControllers.dislikeMovie);

// @routes api/movies/comment/:id
// @desc comment movies
// @access private
router.patch("/comment/:id", verify, movieControllers.comment);

// @routes api/movies/updateComment/:id
// @desc update comment movies
// @access private
router.patch("/updateComment/:id", verify, movieControllers.updateComment);

// @routes api/movies/deleteComment/:id
// @desc delete comment movies
// @access private
router.patch("/deleteComment/:id", verify, movieControllers.deleteComment);

// @routes api/movies/view/:id
// @desc view movies
// @access private
router.patch("/view/:id", verify, movieControllers.addView);

// @routes api/movies/getLikeMovie/:id
// @desc get like movie
// @access private
router.get("/getLikeMovie/:id", verify, movieControllers.getLikeVideo);

module.exports = router;