const express = require("express");
const router = express.Router();
const Course = require("../../models/Course");
const Subject = require("../../models/Subjects");
const User = require("../../models/User");

router.get("/get-subjects", async (req, res) => {
    try {
        const courseId = req.query.courseId;
        const subjects = await Subject.find({course: courseId});
        return res.status(200).json(subjects);
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal Server Error"})
    }
})

router.get("/get-user-subjects", async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
        const subjects = await Subject.find({course: {$in: user.courses}});
        return res.status(200).json(subjects);
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal Server Error"})
    }
})

module.exports = router;