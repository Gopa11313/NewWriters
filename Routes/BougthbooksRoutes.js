const express = require('express');
const Bougthbooks = require('../Models/Bougthbooks');
const router = express.Router();
const auth = require("../middleware/auth")
const multer = require("multer");
const { check, validationResult } = require('express-validator');
const uploadfile = require('../MiddleWare/uploadFile.js');
const upload = require('../MiddleWare/upload');

router.post('/buying/books',
    (req, res) => {
        var post_data = req.body;
        var userId = post_data.userId
        var bookId = post_data.bookId
        var date = Date.now()
        var data = new Bougthbooks({userId:userId, bookId: bookId, date: date })
        data.save().then(function (data) {
            console.log(data)
            res.status(200).json({ success: true, msg: "Thnks for buying this book. Enoy!!" })
        }).catch(function (e) {
            res.status(201).json({ success: false, msg: "Some Error Occurs" })
        })
    })

router.get("/get/all/bougthBook/:id",
    auth.varifyUser,
    (req, res) => {
        var id=req.params.id
        date = { date: -1 }
        Bougthbooks.find({userId:id}).sort(date).then(function (data) {
            res.status(200).json({ success: true, msg: "Done", data: data })
        }).catch(function (e) {
            res.status(201).json({ success: false, msg: "some error" })
        })
    }
)
module.exports = router