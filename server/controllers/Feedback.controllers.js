const Feedback = require('../models/Feedback.model');

module.exports.createFeedback = async (req, res) => {
    const newFeedback = new Feedback(req.body);
    try {
        const savedFeedback = await newFeedback.save();
        res.status(200).json(savedFeedback);
    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports.getFeedback = async (req, res) => {
    try {
        const feedbacks = await Feedback.find();
        res.status(200).json(feedbacks);
    } catch (error) {
        res.status(500).json("Internal server error");
    }
};

module.exports.deleteFeedback = async (req, res) => {
    if (req.user.isAdmin) {
        try {
            await Feedback.findByIdAndDelete(req.params.id);
            res.status(200).json("Feedback has been delete...");
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(400).json("You are not allowed!");
    }
};