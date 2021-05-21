const mongoose = require('mongoose');
const Notification = mongoose.model('Notification', {
    bookId:{
        type:String
    },
    checked:{
        type:Boolean,
        enum:[true,false],
        defult:false
    },
    date:{
        type:Date
    }
})
module.exports = Notification;