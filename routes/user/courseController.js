const express = require("express");
const router = express.Router();
const Course = require("../../models/Course");
const Subject = require("../../models/Subjects");
const User = require("../../models/User");
router.get("/get-courses", async (req, res) => {
    try{
        const courses = await Course.find();
        return res.status(200).json(courses);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal Server Error"});
    }
})

router.get("/get-user-courses", async (req, res) => {
    try{
        const user = await User.findById(req.user._id)
        const courses = await Course.find({_id: {$in: user.courses}});
        return res.status(200).json(courses);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal Server Error"});
    }
})

router.post("/add-course", async (req, res) => {
    try{
        const {courseId} = req.body;
        const course = await Course.findById(courseId);
        if (!course) return res.status(400).json({message: "Course does not exist"})
  
        const user = await User.findById(req.user._id);
        user.courses.push(courseId);
        await user.save();
        return res.status(200).json({message: "Course added successfully"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal Server Error"});
    }
})

module.exports = router;