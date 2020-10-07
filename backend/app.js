const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded());

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
    const post = req.body;
    console.log(post);
    res.status(201).json({
        message:"Post added successfully!"
    })
});

app.get('/api/posts',(req,res,next)=>{
    const posts = [
        {
        id:"fad123123",
        title:"first ever server side post",
        content:"this is coming from the server"
    },
    {
        id:"fadasdad",
        title:"Second ever server side post",
        content:"This is second post coming from the server"
    }
    ];

    res.status(200).json({
        message:"Posts fetched successfully",
        posts:posts
    })


});




module.exports = app;

