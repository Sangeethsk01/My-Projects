const express = require('express')
const router = express.Router()
const { posts, Likes } = require("../models");
const {validateToken} = require('../middlewares/AuthMiddleware');

router.get("/",validateToken, async (req,res)=>{
    const listOfPosts = await posts.findAll({include: [Likes]});
    const likedPosts = await Likes.findAll({where: {UserId: req.user.id } }
    )
    res.json({listOfPosts: listOfPosts, likedPosts: likedPosts.map((like)=>{return like.postId;})} );
});

router.get('/byId/:id', async (req,res) => {
    const id = req.params.id;
    const post = await posts.findByPk(id);
    res.json(post);
} );

router.post("/", async (req,res)=>{
     const newpost = req.body;
     await posts.create(newpost);
     res.json(newpost);
})

module.exports = router;