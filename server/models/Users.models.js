const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        googleId: {
            type: String,
            required: true,
        },
        displayName: {
            type: String, 
            required: true, 
        },
        email: {
            type: String, 
            required: true, 
            unique: true
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        password: { 
            type: String, 
            required: true 
        },
        profilePic: { 
            type: String, 
            defaut: "" 
        },
        isAdmin: { 
            type: Boolean, 
            default: false 
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);