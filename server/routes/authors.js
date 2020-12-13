const express = require('express');
const router = express.Router();
const { Author } = require("../models/Author");
const { Book } = require("../models/Book");
const { auth } = require("../middleware/auth");

//=================================
//             Get Authors
//=================================


router.post("/getAuthors", (req, res) => {
    Author.find()
        .exec((err, authors) => {
        if (err) return res.status(400).json({ success: false, err })
        res.status(200).json({ success: true, authors })
    })
})


module.exports = router;
