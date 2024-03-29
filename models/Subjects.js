const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
    },
    status: {
        type: String,
        default: "active",
    },
    vidoes: {
        type: Array,
    },
    docs: {
        type: Array,
    },
    date: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model("Subject", subjectSchema);