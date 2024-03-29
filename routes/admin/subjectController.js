const express = require("express");
const router = express.Router();
const Course = require("../../models/Course");
const Subject = require("../../models/Subjects");

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

router.post("/add-subject", async (req, res) => {
    try {
        let {name, description, course} = req.body;
        const courses = await Course.find({_id: course});

        if (!name || !description || !course) return res.status(400).json({message: "All fields are required"})
        if (courses.length === 0) return res.status(400).json({message: "Course does not exist"})
        
        const subject = new Subject({
            name,
            description,
            course
        });
        await subject.save();
        return res.status(200).json({message: "Subject added successfully"});
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal Server Error"})
    }
})

router.put("/update-subject/:id", async (req, res) => {
    try {
        const {name, description} = req.body;
        const {id} = req.params;

        const subject = await Subject.findById(id);
        if (!subject) return res.status(400).json({message: "Subject does not exist"})

        await Subject.findByIdAndUpdate(id, {name, description});
        return res.status(200).json({message: "Subject updated successfully"});
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal Server Error"})
    }
})

router.delete("/delete-subject/:id", async (req, res) => {
    try {
        const {id} = req.params;
        await Subject.findByIdAndDelete(id);
        return res.status(200).json({message: "Subject deleted successfully"});
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal Server Error"})
    }
})

module.exports = router;