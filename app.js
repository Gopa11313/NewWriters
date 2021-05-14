const express=require('express');
const bodyparser=require('body-parser');
const path=require("path")
const cors=require("cors")
const User=require("./Routes/UserRoutes")
const Book=require("./Routes/BookRoutes")
const Review=require("./Routes/ReviewRoutes")
const mongooes=require("./Db/db")
const app=express();
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyparser.urlencoded({extended:false}))
app.use(express.json())
app.use(cors())
app.use(User)
app.use(Book)
app.use(Review)
// app.use(Bookmark)
// app.use(Comment)


app.listen(3000)