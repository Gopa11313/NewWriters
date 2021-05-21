const mongoose = require('mongoose');
const Register = mongoose.model('USer', {
    name: {
        type: String,
        requried: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    slider: {
        type: Boolean
    },
    night_Mode: {
        type: Boolean
    },
    role:{
        type:String,
        enum:['User','Admin'],
        defult:'User'
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]

})
module.exports = Register;