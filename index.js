const express = require('express');
const app = express();
const authRouth = require('./routes/auth')
const Db = require("./config/mongoose")




// route of the app
app.use("/api/user", authRouth);



app.listen(5000, (e) => {
    if (e) {
        console.log(e);
    }
    console.log(`app is running port 5000`)
})