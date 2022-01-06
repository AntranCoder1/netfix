const List = require('../models/List.models');

module.exports.createListMovie = async (req, res) => {
    if (req.user.isAdmin) {
        const newList = new List(req.body);
        try {
            const savedList = await newList.save();
            res.status(200).json(savedList);
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(403).json("You are not allowes!");
    }
};

module.exports.updatedListMovie = async (req, res) => {
    if (req.user.isAdmin) {
        try {
            const updatedList = await List.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                { new: true },
            );
            res.status(200).json(updatedList);
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(403).json("You are not allowed!");
    }
};

module.exports.deletedListMovie = async (req, res) => {
    if (req. user.isAdmin) {
        try {
            await List.findByIdAndDelete(req.params.id);
            res.status(200).json("List movie has been delete...");
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(403).json("You are not allowed!");
    }
};

module.exports.getListMovie = async (req, res) => {
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
};

module.exports.getNewList = async (req, res) => {
    const query = req.query.new;
    if (req.user.isAdmin) {
        try {
            const lists = query 
                ? await List.find().sort({ _id: -1 }).limit()
                : await List.find();
            res.status(200).json(lists); 
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(403).json("You are not allowed to see all list movie");
    }
};