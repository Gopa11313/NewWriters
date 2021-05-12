const mongoose = require('mongoose');
const Book = mongoose.model('Book', {
    author_name: {
        type: String,
        requried: true
    },
    book_name: {
        type: String,
        required: true
    },
    cover_page: {
        type: String
    },
    book: {
        type: String
    },
    description: {
        type: String
    },
    ratting:{
        type:Number
    },
    noofRating:{
        type:Number
    },
    price:{
        type:String
    },
    offer:{
        type:String
    }
})
module.exports = Book;