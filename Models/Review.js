const mongoose = require('mongoose');
const Review = mongoose.model('Review', {
    userId: {
        type: String,
        requried: true
    },
    bookId: {
        type: String,
        required: true
    },
    date: {
        type: Date
    },
    review: {
        type: String
    },
    ratting:{
        type:String
    }

})
module.exports = Review;