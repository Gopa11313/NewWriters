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
        type: String
    },
    review: {
        type: String
    },
    ratting:{
        type:Number
    }

})
module.exports = Review;