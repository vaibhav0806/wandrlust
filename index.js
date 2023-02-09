const express = require('express');
const path = require('path');
const app = express();

var PORT = process.env.PORT || 6969
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))

app.get('/', (req, res) => {
    res.send("HELLO");
});

app.get('/home', (req, res) => {
    res.render('home');
});

app.listen(PORT, err => {
    if(err) {
        console.log(err);
    }
    console.log('Listening on port ', PORT);
})