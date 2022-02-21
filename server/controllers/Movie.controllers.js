const Movie = require('../models/Movie.models');
const User = require('../models/Users.models');

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

module.exports.likeMovie = async (req, res) => {
    try {
        await Movie.findByIdAndUpdate(
            req.params.id,
            {
                $addToSet: { likers: req.body.id },
            },
            { new: true },
            (err, docs) => {
                if (err) return res.status(400).send(err);
            }
        );
        await User.findByIdAndUpdate(
            req.body.id,
            {
                $addToSet: { likes: req.params.id },
            },
            { new: true },
            (err, docs) => {
                if (!err) res.send(docs);
                else return res.status(400).send(err);
            }
        );
    } catch (err) {
        return res.status(400).send(err);
    }
};

module.exports.dislikeMovie = async (req, res) => {
    try {
        await Movie.findByIdAndUpdate(
            req.params.id,
            {
                $pull: { likers: req.body.id },
            },
            { new: true },
            (err, docs) => {
                if (err) return res.status(400).send(err);
            }
        );
        await User.findByIdAndUpdate(
            req.body.id,
            {
                $pull: { likes: req.params.id },
            },
            { new: true },
            (err, docs) => {
                if (!err) res.send(docs);
                else return res.status(400).send(err);
            }
        );
    } catch (err) {
        return res.status(400).send(err);
    }
};

module.exports.feelMovie = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);

        if (!movie.likes.includes(req.body.userId)) {
            await movie.updateOne({ $push: { likers: req.body.userId } });
            res.status(200).json({ success: true, message: "Movie has been liked" });
        } else {
            await movie.updateOne({ $pull: { likers: req.body.userId } });
            res.status(200).json({ success: true, message: "Movie has been disliked" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json("Internal server error");
    }
};

module.exports.comment = async (req, res) => {
    try {
        await Movie.findByIdAndUpdate(
            req.params.id,
            {
                $addToSet : {
                    comments: {
                        commenterId: req.body.commenterId,
                        commenterUsername: req.body.commenterUsername,
                        text: req.body.text,
                        timestamp: new Date().getTime(),
                    },
                },
            },
            { new: true },
            (err, docs) => {
                if (!err) return res.send(docs);
                else return res.status(400).send(err);
            }
        );
    } catch (error) {
        res.status(500).json("Internal server error");
    }
};

module.exports.updateComment = async (req, res) => {
    try {
        await Movie.findById(req.params.id, (err, docs) => {
            const theComment = docs.comments.find((comment) => 
                comment._id.equals(req.body.commentId)
            );

            if (!theComment) return res.status(404).send("Comment not found");
            theComment.text = req.body.text;

            return docs.save((err) => {
                if (!err) return res.status(200).send(docs);
                return res.status(500).send(err);
            });
        });
    } catch (error) {
        res.status(500).json("Internal server error");
    }
};

module.exports.deleteComment = async (req, res) => {
    try {
        await Movie.findByIdAndUpdate(
            req.params.id,
            {
                $pull: {
                    comments: {
                        _id: req.body.commentId,
                    },
                },
            },
            { new: true },
            (err, docs) => {
                if (!err) return res.send(docs);
                else return res.status(400).send(err);
            }
        );
    } catch (error) {
        res.status(500).json("Internal server error");
    }
};