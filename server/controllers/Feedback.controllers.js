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