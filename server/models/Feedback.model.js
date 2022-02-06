const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true
        },
        phone: {
            type: Number,
            required: true
        },
        feedback: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Feedback", FeedbackSchema);