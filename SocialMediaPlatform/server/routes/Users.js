const express = require('express')
const router = express.Router()
const { Users } = require("../models");
const bcrypt = require("bcryptjs");
const {sign} = require('jsonwebtoken');


// User registration
router.post("/", async (req,res)=>{
     const {username, password} = req.body;
     bcrypt.hash(password, 10).then((hash)=>{
        Users.create({
            username: username,
            password: hash,
        });
        res.json("REGISTRATION SUCCESS");
     });
});

//User log in
router.post("/login", async (req,res)=>{
    const {username, password} = req.body;
    const user = await Users.findOne({where:{username: username}});
    if (!user) return res.json({error:"Incorrect username"});

    bcrypt.compare(password, user.password).then((match)=>{
        if(!match) return res.json({error:"Incorrect password"});

        // Created access token
        const accessToken = sign({username: user.username, id: user.id},"secretKey")

        res.json(accessToken);
    })
});


module.exports = router;