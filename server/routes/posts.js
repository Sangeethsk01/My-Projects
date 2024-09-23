const express = require('express')
const router = express.Router()
const { posts, Likes } = require("../models");
const {validateToken} = require('../middlewares/AuthMiddleware');

// GET LIST OF POSTS
router.get("/",validateToken, async (req,res)=>{
    const listOfPosts = await posts.findAll({include: [Likes]});
    const likedPosts = await Likes.findAll({where: {UserId: req.user.id } }
    )
    res.json({listOfPosts: listOfPosts, likedPosts: likedPosts.map((like)=>{return like.postId;})} );
});

// GET A POST BY ID
router.get('/byId/:id',validateToken, async (req,res) => {
    const id = req.params.id;
    const post = await posts.findByPk(id);
    res.json(post);
} );

// ADD A NEW POST
router.post("/", validateToken, async (req,res)=>{
     const {title,body} = req.body;
     const newpost = { title: title,
        body: body,
        author: req.user.username,
     }
     await posts.create(newpost);
     res.json(newpost);
})


// DELETE A POST
router.delete("/:postId", validateToken, async (req, res) => {
    const postId = req.params.postId;
    const username = req.user.username;
    const post = await posts.findOne({
        where: {
            id: postId,
            author: username
        }
    });
    if (post){
        await posts.destroy({
            where: {
                id: postId,
            },
        });
        res.json("Deleted successfully");
    } else {
        res.json("Not authorized");
    }
});


module.exports = router;