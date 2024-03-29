const express = require("express");
const router = express.Router();
const Users = require("../../models/User");
const bcrypt = require("bcryptjs");

router.get("/get-users", async (req, res) => {
    try{
        const users = await Users.find();
        return res.status(200).json(users);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal Server Error"});
    }
})

router.post("/add-user", async (req, res) => {
    try{
        let {name, email, password} = req.body;
        const user = new Users({
            name,
            email,
            password: await bcrypt.hash(password, 10),
        });
        await user.save();
        return res.status(200).json({message: "User added successfully"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal Server Error"});
    }
})

router.put("/update-user/:id", async (req, res) => {
    try{
        const {name, email} = req.body;
        const {id} = req.params;
        await Users.findByIdAndUpdate(id, {name, email});
        return res.status(200).json({message: "User updated successfully"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal Server Error"});
    }
})

router.delete("/delete-user/:id", async (req, res) => {
    try{
        const {id} = req.params;
        await Users.findByIdAndDelete(id);
        return res.status(200).json({message: "User deleted successfully"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal Server Error"});
    }
})

router.post("/user-status", async (req, res) => {
    try{
        const {id} = req.body;
        
        const user = await Users.findById(id);
        let status = user.status === "active" ? "inactive" : "active";
        await Users.findByIdAndUpdate
        (id, {status});
        
        return res.status(200).json({message: "User status updated successfully"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal Server Error"});
    }
})

module.exports = router;