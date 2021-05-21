const express = require('express');
const jwt = require('jsonwebtoken')
const router = express.Router();
const Notification = require('../Models/Notification');
const { response, Router } = require('express');
const auth = require("../MiddleWare/auth")
const { check, validationResult } = require('express-validator');
const { json } = require('body-parser');

router.post("/notification/add",
    auth.varifyUser,
    (req, res) => {
        console.log(req.body)
        const req_data=req.body
        const bookId=req_data.bookId
        const checked=false
        const date=Date.now()
        var data=Notification({bookId:bookId,checked:checked,date:date})
        data.save().then(function () {
            res.status(200).json({ success: true, msg:"Successfully added notification." })
        }).catch(function (e) {
            res.status(201).json({ success: false, msg: "Some Error Occurs" })
        })
    }
)

router.get("/get/all/notification",
    auth.varifyUser,
    (req, res) => {
        date = { date: -1 }
        Notification.find().sort(date).then(function (data) {
            res.status(200).json({ success: true, msg: "Done", data: data })
        }).catch(function (e) {
            res.status(201).json({ success: false, msg: "some error" })
        })
    }
)

router.put("/checked/notification/:id",
    auth.varifyUser,
    (req, res) => {
        const _id=req.params.id
        console.log(_id)
        const checked=true
        Notification.updateOne({ _id: _id }, { checked: checked }).then(function (data) {
            console.log("pass")
            res.status(200).json({ success: true, msg: "Done", data: data })
        }).catch(function (e) {
            res.status(201).json({ success: false, msg: "some error" })
        })
    }
)
module.exports = router