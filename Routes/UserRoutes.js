const express = require('express');
const jwt = require('jsonwebtoken')
const router = express.Router();
const bcrypt = require('bcryptjs')
const User = require('../Models/User');
const { response } = require('express');
const saltRounds = 10;
const multer = require("multer");
const auth = require("../MiddleWare/auth")
const upload = require("../middleware/upload")
const { check, validationResult } = require('express-validator');
const { json } = require('body-parser');

router.post("/user/add",
    [
        check('name', "Name must be filled").not().isEmpty(),
        check('email', "Enter a valid email").isEmail(),
        check('password', "Password must be 6 latter long").isLength({ min: 6 })
    ],
    (req, res) => {
        const errros = validationResult(req);
        if (errros.isEmpty()) {
            var data1 = req.body;
            console.log(data1)
            var name = data1.name;
            var email = data1.email;
            var password = data1.password
            var image = "noimg"
            var role = "User"
            const hash = bcrypt.hashSync(password, saltRounds);
            var data = new User({ name: name, email: email, password: hash, image: image, role: role })
            data.save().then(function () {
                res.status(200).json({ success: true, msg: "User Register Success" })
            }).catch(function (e) {
                res.status(201).json({ success: false, msg: "Some Error Occurs" })
            })
        }
        else {
            res.status(201).json({ success: false, msg: "Error" })
        }
    })


router.post('/user/login', (req, res) => {
    const body = req.body;
    User.findOne({ email: body.email }).then(function (userData) {
        if (userData == null) {
            return res.status(201).json({ success: false, msg: "Invalid User!!" })
        }
        bcrypt.compare(body.password, userData.password, function (err, result) {
            if (result == false) {
                return res.status(201).json({ success: false, msg: "Invalid User!" })
            }
            User.find({ email: req.body.email }).then(function (data) {
                const token = jwt.sign({ userId: userData._id }, 'secretkey');
                console.log(data)
                res.status(200).json({ success: true, msg: "Login Successfull", token: token, data: data, id: userData._id, role: userData.role })
            }).catch(function (e) {

            })
        })

    }).catch(function (e) {
        res.status(500).json({ success: false, msg: e })
    })
})

router.get("/user/by/:id",
    auth.varifyUser,
    (req, res) => {
        const id = req.params.id
        User.find({ _id: id }).then(function (data) {
            res.status(200).json({ success: true, data: data, msg: "User Register Success" })
        }).catch(function (e) {
            res.status(201).json({ success: false, msg: "Some Error Occurs" })
        })
    })

router.put("/upload/user/image/:id", auth.varifyUser, (req, res) => {
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
            image = req.file.filename
            console.log("here")
            console.log(image)
            User.updateOne({ _id: id }, { image: image }).then(function () {
                res.status(200).json({ success: true, msg: "Done" })
            }).catch(function (e) {
                res.status(201).json({ success: false, msg: "not register" })
            })
        }
    })
})

module.exports = router