const express = require('express');
const jwt = require('jsonwebtoken')
const router = express.Router();
const Bookmark = require('../Models/Bookmark');
const { response, Router } = require('express');
const auth = require("../MiddleWare/auth")
const { check, validationResult } = require('express-validator');
const { json } = require('body-parser');

router.post("/bookmark/book",
    auth.varifyUser,
    (req, res) => {
        console.log(req.body)
        const req_data=req.body
        const userId=req_data.userId
        const bookId=req_data.bookId
        const date=Date.now()
        var data=Bookmark({userId:userId,bookId:bookId,date:date})
        data.save().then(function () {
            res.status(200).json({ success: true, msg:"Successfully Bookmarked!!" })
        }).catch(function (e) {
            res.status(201).json({ success: false, msg: "Some Error Occurs" })
        })
    }
)
module.exports = router