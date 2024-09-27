const express = require('express')
const router = express.Router()
const { Users } = require("../models");
const bcrypt = require("bcryptjs");
const {sign} = require('jsonwebtoken');
const {validateToken} = require('../middlewares/AuthMiddleware')


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

        res.json({token:accessToken, username: user.username, id: user.id});
    }) 
});

// Authenticate user
router.get("/user", validateToken, (req, res)=>{
    res.json(req.user);
});

//Get user by id
router.get("/profile/:userId", async (req, res)=>{
    try {
        const userId = req.params.userId;
        const user = await Users.findByPk(userId, {
            attributes: { exclude: ['password'] }
        });

        if (user) {
            res.json({ username: user.username });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});


  //Change password 
  router.put('/changepassword',validateToken, async (req, res) => {
    const {oldPassword, newPassword} = req.body;
    const userId = req.user.id;
    const user = await Users.findOne({where:{id: userId}});
    const match = await bcrypt.compare(oldPassword, user.password)
    if(!match) return res.json({error:"Incorrect password"});
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await Users.update({password: hashedPassword }, {where: {id:userId}});
    res.json("UPDATED SUCCESSFULLY");

  })

module.exports = router;