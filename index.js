const express = require('express');

const app = express();

var PORT = process.env.PORT || 6969

app.get('/', (req, res) => {
    res.send("HELLO");
});

app.listen(PORT, err => {
    if(err) {
        console.log(err);
    }
    console.log('Listening on port ', PORT);
})