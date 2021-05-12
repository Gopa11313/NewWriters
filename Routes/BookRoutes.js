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
            var cover_page="noimg"
            var author_name = post_data.author_name;
            var book_name = post_data.book_name;
            var price = post_data.price;
            var offer = post_data.offer;
            var description = post_data.description;
            var ratting = 0.00
            var noofRating = 0
            var data = new Book({ book: book, cover_page: cover_page, author_name: author_name, book_name: book_name, price: price, description: description, ratting: ratting, noofRating: noofRating, offer:offer })
            data.save().then(function (data) {
                res.status(200).json({ success: true, msg: "Book Successfully uploaded.", id: data._id })
            }).catch(function (e) {
                console.log("here")
                res.status(201).json({ success: false, msg: "Some Error Occurs" })
            })
    })

router.put("/upload/image/:id",
auth.varifyUser,
auth.varifyAdmin,(req, res) => {
    const id = req.params.id
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            console.log("here")
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

router.put("/upload/book/:id", auth.varifyUser,auth.varifyAdmin, (req, res) => {
    const id = req.params.id
    console.log("Now")
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
            console.log("hello")
            book = req.file.filename
            Book.updateOne({ _id: id }, { book: book }).then(function () {
                res.status(200).json({ success: true, msg: "Done" })
            }).catch(function (e) {
                res.status(201).json({ success: false, msg: "not register" })
            })
        }
    })
})
    module.exports = router