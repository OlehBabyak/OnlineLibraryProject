const express = require('express');
const router = express.Router();
const { Book } = require("../models/Book");
const { auth } = require("../middleware/auth");
const multer = require('multer');

//=================================
//             Add Book
//=================================


router.post("/saveBook", auth, (req, res) => {

    const book = new Book(req.body)

    book.save((err, book) => {
        console.log(err)
        if (err) return res.json({ success: false, err })

        Book.find({ '_id': book._id })
            .populate('writer')
            .exec((err, result) => {
                if (err) return res.json({ success: false, err })
                return res.status(200).json({ success: true, result })
            })
    })
});

router.post("/uploadImage", auth, (req, res) => {

    let storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'client/public/uploads/')
        },
        filename: (req, file, cb) => {
            cb(null, `${Date.now()}_${file.originalname}`)
        },
        fileFilter: (req, file, cb) => {
            const ext = path.extname(file.originalname)
            if (ext !== '.jpg' || ext !== '.png') {
                return cb(res.status(400).end('дозволено завантажувати тільки наступні формати: jpg, png'), false);
            }
            cb(null, true)
        }
    })

    let upload = multer({ storage: storage }).single("file")

    upload(req, res, err => {
        if (err) {
            return res.json({ success: false, err })
        }
        return res.json({ success: true, image: res.req.file.path, fileName: res.req.file.filename })
    })

});


module.exports = router;
