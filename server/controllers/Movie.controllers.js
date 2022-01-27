const Movie = require('../models/Movie.models');

module.exports.createMovie = async (req, res) => {
    if (req.user.isAdmin) {
        const newMovie = new Movie(req.body);
        try {
            const savedMovie = await newMovie.save();
            res.status(200).json(savedMovie);
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(403).json("You are not allowed!");
    }
};

module.exports.updatedMovie = async (req, res) => {
    if (req.user.isAdmin) {
        try {
            const updatedMovie = await Movie.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body 
                },
                { new: true }
            );
            res.status(200).json(updatedMovie);
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(403).json("You are not allowed!");
    }
};

module.exports.deletedMovie = async (req, res) => {
    if (req.user.isAdmin) {
        try {
            await Movie.findByIdAndDelete(req.params.id);
            res.status(200).json("Movie has been delete...");
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(403).json("You are not allowed!");
    }
};

module.exports.findMovie = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json("Internal server error");
    }
};

module.exports.getAllMovie = async (req, res) => {
    try {
        const movies = await Movie.find();
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json("Internal server error");
    }
};

module.exports.getRandom = async (req, res) => {
    const type = req.query.type;
    let movie;
    try {
        if (type === "series") {
            movie = await Movie.aggregate([
                { $match: { isSeries: true } },
                { $sample: { size: 1 } }
            ]);
        } else {
            movie = await Movie.aggregate([
                { $match: { isSeries: false } },
                { $sample: { size: 1 } }
            ]);
        }
        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports.searchMovie = async (req, res) => {
    const value = req.query.value;
    try {
        const movie = await Movie.find();
        const matchMovies = movie.filter(movies => {
            return movies.title.toLowerCase().indexOf(value.toLowerCase()) !== -1;
        });
        res.status(200).json(matchMovies);
    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports.getMovieList = async (req, res) => {
    const type = req.query.genre;
    let movie = [];
    try {
        if (type) {
            movie = await Movie.aggregate([
                { $match: { genre: type } },
                { $sample: { size: 10 } }
            ]);
        } else {
            movie = await Movie.aggregate([
                { $sample: { size: 10 } }
            ]);
        }
        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json(error);
    }
};