const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Post = require('./models/post');
require('dotenv').config();
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded());

// Connect to mongoDB
mongoose.connect(process.env.DB_LINK, {
// mongoose.connect(process.envDB_LINK, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  })



app.use((req,res,next)=>{
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Origin');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    // res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});




app.post('/api/posts',(req,res,next)=>{
    const post = new Post({
        title:req.body.title,
        content:req.body.content
    })
    post
    .save()
    .then(response=>{
        // console.log(response);
        res.status(201).json({
            message:"Post added successfully",
            postId:response._id
        })
    })
    .catch((err)=>{console.log(err);})
    



});

app.get('/api/posts',(req,res)=>{
    Post
    .find()
    .then((documents)=>{
        res.status(200).json({
            message:"Posts fetched successfully",
            posts:documents
        })
    })
    .catch((err)=>{console.log(err);})

});


app.delete('/api/posts/:id',(req,res)=>{
    // Post.findByIdAndDelete(req.params.id)
    console.log(req.params.id);
    
    Post.findByIdAndDelete(req.params.id)
        .then(res.status(200).json({message:"Post deleted!"}))
        .catch((err)=>{console.log(err);})

})

module.exports = app;

