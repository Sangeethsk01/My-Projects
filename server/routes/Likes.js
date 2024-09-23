const express = require('express')
const router = express.Router()
const { Likes } = require("../models");
const { validateToken } = require('../middlewares/AuthMiddleware');

router.post("/", validateToken, async (req, res) => {
    const { PostId } = req.body;
    const UserId = req.user.id;

    const found = await Likes.findOne({ 
        where: {postId:PostId,UserId : UserId  },
    });
    if (!found) {
        await Likes.create({
            UserId : UserId,
            postId : PostId,
        });
        res.json("Liked the post");
    } else {
        await Likes.destroy({
            where: {postId:PostId,UserId : UserId  },
        })
        res.json("Unliked the post");
    }
    
 
});










module.exports = router;