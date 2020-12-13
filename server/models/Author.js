const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorSchema = mongoose.Schema({
    writer: {
        type:Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type:String,
        maxlength:50,
    },
    images: {
        type: Array,
        default: []
    },
    birthDate: {
        type: Date,
    },
    deathDate: {
        type: Date
    }
})


const Author = mongoose.model('Author', authorSchema);

module.exports = { Author: Author }