const express = require('express');
const router = express.Router();
const { Author } = require("../models/Author");
const { Book } = require("../models/Book");
const { auth } = require("../middleware/auth");

//=================================
//             Get Authors
//=================================


router.post("/getAuthors", (req, res) => {

    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);

    Author.find().populate("writer")
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec((err, authors) => {
        if (err) return res.status(400).json({ success: false, err })
        res.status(200).json({ success: true, authors, postSize: authors.length })
    })
})

router.post("/getAuthorById", (req, res) => {

    let authorId = req.body.author;

    Author.findById(authorId).populate("writer")
        .exec((err, author) => {
            if (err) return res.status(400).json({ success: false, err })
            console.log(author)
            res.status(200).json({ success: true, author })
        })
})



module.exports = router;
