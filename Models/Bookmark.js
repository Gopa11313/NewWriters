const mongoose = require('mongoose');
const Bookmark = mongoose.model('Bookmark', {
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
    }
})
module.exports = Review;