const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
        },
        desc: {
            type: String,
        },
        img: {
            type: String,
        },
        imgTitle: {
            type: String,
        },
        imgSm: {
            type: String,
        },
        trailer: {
            type: String,
        },
        video: {
            type: String,
        },
        year: {
            type: String,
        },
        limit: {
            type: Number,
        },
        genre: {
            type: String,
        },
        likers: {
            type: [String],
            required: true,
        },
        comments: {
            type: [
                {
                    commenterId:String,
                    commenterUsername: String,
                    text: String,
                    timestamp: Number,
                }
            ],
            required: true,
        },
        view: {
            type: [String],
            required: true,
        },
        isSeries: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Movie", MovieSchema);