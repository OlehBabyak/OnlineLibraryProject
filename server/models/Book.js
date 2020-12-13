const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = mongoose.Schema({
    writer: {
        type:Schema.Types.ObjectId,
        ref: 'User'
    },
    author: {
        type:Schema.Types.ObjectId,
        ref: 'Author'
    },
    title: {
        type: String,
        maxlength:50,
    },
    description: {
        type: String,
    },
    genre: {
        type: String
    },
    images: {
        type: Array,
        default: []
    },
    releaseDate: {
        type: Date,
    },
    pages: {
        type: String
    }
})

bookSchema.index({
    title:'text',
},
    {
    weights: {
        name: 1,
    }
})

const Book = mongoose.model('Book', bookSchema);

module.exports = { Book: Book }