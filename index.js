const express = require('express');
const app = express();





// route of the app
app.get('/', (req, res) => { res.send("home") });


app.listen(5000, (e) => {
    if (e) {
        console.log(e);
    }
    console.log(`app is running port 5000`)
})