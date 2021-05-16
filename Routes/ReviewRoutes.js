const express = require('express');
const jwt = require('jsonwebtoken')
const router = express.Router();
const Review = require('../Models/Review');
const { response, Router } = require('express');
const auth = require("../MiddleWare/auth")
const { check, validationResult } = require('express-validator');
const { json } = require('body-parser');

router.post("/add/review",
    auth.varifyUser,
    (req, res) => {
        console.log(req.body)
        const req_data=req.body
        const userId=req_data.userId
        const bookId=req_data.bookId
        const date=Date.now()
        const review=req_data.review
        const ratting=req_data.ratting
        var data=Review({userId:userId,bookId:bookId,date:date,review:review,ratting:ratting})
        data.save().then(function () {
            res.status(200).json({ success: true, msg:"Thank You For Your Review!!" })
        }).catch(function (e) {
            res.status(201).json({ success: false, msg: "Some Error Occurs" })
        })
    }
)
router.get("/get/all/review/:bookid",
    auth.varifyUser,
    (req, res) => {
        const bookId=req.params.bookid
        date = { date: -1 }
        Review.find({bookId:bookId}).sort(date).then(function (data) {
            res.status(200).json({ success: true, msg: "Done", data: data })
        }).catch(function (e) {
            res.status(201).json({ success: false, msg: "some error" })
        })
    }
)
module.exports = router