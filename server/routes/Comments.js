const express = require('express')
const router = express.Router()
const { Comments } = require("../models");
const {validateToken} = require('../middlewares/AuthMiddleware');

// Get comments of a specific post
router.get('/:postId', async (req,res) => {
    const postId = req.params.postId;
    const comments = await Comments.findAll({ where: {postId: postId}});
    res.json(comments); 
} );

// Post a comment
router.post("/", validateToken, async (req, res) => {
    const comment = req.body;
    const username = req.user.username;
    comment.username = username;
    await Comments.create(comment);
    res.json(comment);
});

// Delete a comment
router.delete("/:commentId", validateToken, async (req, res) => {
    const commentId = req.params.commentId;

   await Comments.destroy({
        where: {
            id: commentId,
        },
    });
    res.json("Deleted successfully");
});




module.exports = router;