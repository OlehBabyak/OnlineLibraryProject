const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteSchema = mongoose.Schema({
    userFrom: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    bookId : {
        type: String
    },
    bookTitle: {
        type: String
    },
    images: {
        type: Array,
        default: []
    }

}, { timestamps: true })


const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = { Favorite }
