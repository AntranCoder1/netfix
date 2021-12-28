const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        googleId: {
            type: String,
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
        },
        lastName: {
            type: String,
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