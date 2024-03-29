const express = require("express");
const router = express.Router();
const Course = require("../../models/Course");
const Subject = require("../../models/Subjects");

router.get("/get-courses", async (req, res) => {
    try{
        const courses = await Course.find();
        return res.status(200).json(courses);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal Server Error"});
    }
})

router.post("/add-course", async (req, res) => {
    try{
        let {title, description, price, image} = req.body;
        
        const courses = await Course.find({title});
        if (!title || !description || !price || !image) return res.status(400).json({message: "All fields are required"})
        if (courses.length > 0) return res.status(400).json({message: "Course already exists"})

        const course = new Course({
            title,
            description,
            price,
            image,
        });
        await course.save();
        return res.status(200).json({message: "Course added successfully"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal Server Error"});
    }
})

router.put("/update-course/:id", async (req, res) => {
    try{
        const {title, description, price, image} = req.body;
        const {id} = req.params;
        
        const course = await Course.findById(id);
        if (!course) return res.status(400).json({message: "Course does not exist"})

        await Course.findByIdAndUpdate(id, {title, description, price, image});
        return res.status(200).json({message: "Course updated successfully"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal Server Error"});
    }
})

router.delete("/delete-course/:id", async (req, res) => {
    try{
        const {id} = req.params;
        await Course.findByIdAndDelete(id);
        return res.status(200).json({message: "Course deleted successfully"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal Server Error"});
    }
})

router.post("/course-status", async (req, res) => {
    try{
        const {id} = req.body;
        
        const course = await Course.findById(id);
        let status = course.status === "active" ? "inactive" : "active";
        await Course.findByIdAndUpdate(id, {status});
        return res.status(200).json({message: "Course status updated successfully"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal Server Error"});
    }
})

module.exports = router;