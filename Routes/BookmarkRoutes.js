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

router.get("/get/all/bookmark/boook/:userid",
    auth.varifyUser,
    (req, res) => {
        const userId=req.params.userid
        date = { date: -1 }
        Bookmark.find({userId:userId}).sort(date).then(function (data) {
            console.log(data)
            res.status(200).json({ success: true, msg: "Done", data: data })
        }).catch(function (e) {
            res.status(201).json({ success: false, msg: "some error" })
        })
    }
)

router.delete('/delete/bookmark/book/:id',
    auth.varifyUser,
    (req, res) => {
        const _id = req.params.id;
        console.log(_id)
        Bookmark.deleteOne({_id:_id}).then(function () {
            console.log("here")
            res.status(200).json({ success: true, msg: "Bookmark Successfully deleted" })
        }).catch(function (e) {
            res.status(201).json({ success: false, msg: "error" })
        })
    })

module.exports = router