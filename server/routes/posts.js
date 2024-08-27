const express = require('express')
const router = express.Router()
const { posts } = require("../models");

router.get("/", async (req,res)=>{
    const listOfPosts = await posts.findAll();
    res.json(listOfPosts);
});

router.post("/", async (req,res)=>{
     const newpost = req.body;
     await posts.create(newpost);
     res.json(newpost);
})

module.exports = router;