import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
    date_created: {
        type: Date,
        default: Date.now
    },
    date_updated: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model("User", UserSchema);

export default User;