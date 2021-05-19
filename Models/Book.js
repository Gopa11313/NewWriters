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
        type:String
    },
    noofRating:{
        type:String
    },
    price:{
        type:String
    },
    offer:{
        type:String
    },
    date:{
        type:Date
    },
    number_of_sells:{
        type:Number
    }
})
module.exports = Book;