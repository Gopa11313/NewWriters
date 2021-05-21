const express = require('express');
const Book = require('../Models/Book');
const router = express.Router();
const auth = require("../middleware/auth")
const multer = require("multer");
const { check, validationResult } = require('express-validator');
const uploadfile = require('../MiddleWare/uploadFile.js');
const upload = require('../MiddleWare/upload');

router.post('/upload/book',
    (req, res) => {
        var post_data = req.body;
        var book = "nobook";
        var cover_page = "noimg"
        var author_name = post_data.author_name;
        var book_name = post_data.book_name;
        var price = post_data.price;
        var offer = post_data.offer;
        var description = post_data.description;
        var ratting = 0.00
        var number_of_sells = 0
        var date = Date.now()
        var noofRating = 0
        var data = new Book({ book: book, cover_page: cover_page, author_name: author_name, book_name: book_name, number_of_sells: number_of_sells, price: price, description: description, ratting: ratting, noofRating: noofRating, offer: offer, date: date })
        data.save().then(function (data) {
            console.log(data)
            res.status(200).json({ success: true, msg: "Book Successfully uploaded.", id: data._id })
        }).catch(function (e) {
            res.status(201).json({ success: false, msg: "Some Error Occurs" })
        })
    })

router.put("/upload/image/:id",
    auth.varifyUser,
    auth.varifyAdmin, (req, res) => {
        const id = req.params.id
        upload(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                res.status(201).json({ success: false, msg: "error" })
            }
            else if (err) {
                res.status(201).json({ success: false, msg: "not gonna happen" })
            }
            else {
                const id = req.params.id
                cover_page = req.file.filename
                // console.log(cover_page)
                Book.updateOne({ _id: id }, { cover_page: cover_page }).then(function () {
                    res.status(200).json({ success: true, msg: "Done" })
                }).catch(function (e) {
                    res.status(201).json({ success: false, msg: "not register" })
                })
            }
        })
    })

router.put("/upload/book/:id", auth.varifyUser, auth.varifyAdmin, (req, res) => {
    const id = req.params.id
    uploadfile(req, res, function (err) {
        console.log(id)
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading.
            res.status(201).json({ success: false, msg: "error" })
        }
        else if (err) {

            res.status(201).json({ success: false, msg: "not gonna happen" })
        }
        else {
            const id = req.params.id
            book = req.file.filename
            Book.updateOne({ _id: id }, { book: book }).then(function () {
                res.status(200).json({ success: true, msg: "Done" })
            }).catch(function (e) {
                res.status(201).json({ success: false, msg: "not register" })
            })
        }
    })
})
router.get("/get/all/book",
    auth.varifyUser,
    (req, res) => {
        date = { date: -1 }
        console.log("Here")
        Book.find().sort(date).then(function (data) {

            res.status(200).json({ success: true, msg: "Done", data: data })
        }).catch(function (e) {
            res.status(201).json({ success: false, msg: "some error" })
        })
    }
)
router.get("/get/top/ratted/book",
    auth.varifyUser,
    (req, res) => {
        console.log("here bby")
        ratting = { ratting: -1 }
        Book.find().sort(ratting).then(function (data) {
            res.status(200).json({ success: true, msg: "Done", data: data })
        }).catch(function (e) {
            res.status(201).json({ success: false, msg: "some error" })
        })
    }
)

router.get("/get/top/sold/book",
    auth.varifyUser,
    (req, res) => {
        console.log("here nigg")
        number_of_sells = { number_of_sells: -1 }
        Book.find().sort(number_of_sells).then(function (data) {
            // console.log(data)
            res.status(200).json({ success: true, msg: "Done", data: data })
        }).catch(function (e) {
            res.status(201).json({ success: false, msg: "some error" })
        })
    }
)

router.get("/get/book/by/:id",
    auth.varifyUser,
    (req, res) => {
        const id=req.params.id
        console.log("here:"+id)
        Book.find({_id:id}).then(function(data){
            console.log(data)
            res.status(200).json({ success: true, msg: "Done", data: data })
        }).catch(function (e) {
            res.status(201).json({ success: false, msg: "some error" })
        })
    }
)
router.put('/rate/the/note',
    auth.varifyUser, (req, res) => {
        const _id = req.body._id
        const ratting = req.req.ratting
        const noofRating = req.req.noofRating
        Book.updateOne({ _id: _id }, { ratting: ratting, noofRating: noofRating }).then(function () {
            res.status(200).json({ success: true, msg: "Thnak You For Your Ratting" })
        }).catch(function (e) {
            res.status(201).json({ success: false, msg: "Somthing went wrong" })
        })
    }
)

module.exports = router