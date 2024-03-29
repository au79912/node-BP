const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
    },
    status: {
        type: String,
        default: "active",
    },
    date: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model("Course", courseSchema);