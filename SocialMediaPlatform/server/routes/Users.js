const express = require('express')
const router = express.Router()
const { Users } = require("../models");
const bcrypt = require("bcryptjs");
 

router.post("/", async (req,res)=>{
     const {username, password} = req.body;
     bcrypt.hash(password, 10).then((hash)=>{
        Users.create({
            username: username,
            password: hash,
        });
        res.json("SUCCESS");
     });
});

router.post("/login", async (req,res)=>{
    const {username, password} = req.body;
    const user = await Users.findOne({where:{username: username}});
    if (!user) return res.json({error:"Incorrect username"});

    bcrypt.compare(password, user.password).then((match)=>{
        if(!match) return res.json({error:"Incorrect password"});

        res.json("YOU HAVE LOGGED IN!");
    })
});


module.exports = router;