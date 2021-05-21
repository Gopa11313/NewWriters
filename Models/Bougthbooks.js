const mongoose = require('mongoose');
const Bougthbooks = mongoose.model('Bougthbooks', {
    userId:{
        type:String
    },
    bookId:{
        type:String
    },
    date:{
        type:Date
    }
})
module.exports = Bougthbooks;