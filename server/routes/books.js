const express = require('express');
const router = express.Router();
const { Book } = require("../models/Book");
const { auth } = require("../middleware/auth");

//=================================
//             Get Books
//=================================


router.post("/getBooks", (req, res) => {
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);

    let findArgs = {};
    let term = req.body.searchTerm;

    for (let key in req.body.filters) {

        if (req.body.filters[key].length > 0) {
            if (key === "author") {
                findArgs[key] = req.body.filters[key];
            }
        }
    }

    console.log(findArgs)
    console.log(term)

    if (term) {
        Book.find(findArgs)
            .find({ title: { $regex: term, $options: "i" } })
            .populate("writer")
            .sort([[sortBy, order]])
            .skip(skip)
            .limit(limit)
            .exec((err, books) => {
                if (err) return res.status(400).json({ success: false, err })
                res.status(200).json({ success: true, books, postSize: books.length })
            })
    } else {
        Book.find(findArgs)
            .populate("writer")
            .sort([[sortBy, order]])
            .skip(skip)
            .limit(limit)
            .exec((err, books) => {
                if (err) return res.status(400).json({ success: false, err })
                res.status(200).json({ success: true, books, postSize: books.length })
            })
    }

})

router.get("/bookById", (req, res) => {
    let type = req.query.type
    let booksIds = req.query.id

    console.log("req.query.id", req.query.id)

    if (type === "array") {
        let ids = req.query.id.split(',');
        booksIds = [];
        booksIds = ids.map(item => {
            return item
        })
    }

    console.log("booksIds", booksIds)


    Book.find({ '_id': { $in: booksIds } })
        .populate('writer')
        .exec((err, book) => {
            if (err) return res.status(400).send(err)
            return res.status(200).send(book)
        })
});


module.exports = router;
