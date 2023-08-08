require('dotenv').config();
const express = require('express');
const expressLayout = require("express-ejs-layouts");
const app = express();
const port = 8000 || process.env.Port;
const authRouth = require('./routes/auth');
const Db = require("./config/mongoose");




//middelware dependency 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//static file 
app.use(express.static('public'));

//templating engine
app.use(expressLayout);
app.set('layout' , './layouts/main');
app.set('view engine','ejs');

// route of the app
app.use("/api/user", authRouth);



app.listen(port, (error) => {
    if (error) {
        console.log(error);
    }
    console.log(`app is running port ${port}`);
})