const express = require('express');
const path = require('path');
const {DB_URL} = require("./config");
const {mongoose} = require("mongoose");

const app = express();

var PORT = process.env.PORT || 6969
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))

const connect = () =>{
    try{
        mongoose.set('strictQuery', true);
        mongoose.connect(DB_URL);
        console.log("Connected to MongoDb");
    }catch(err){
        console.log(err);
    }
}

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/test', (req, res) => {
    res.render('test');
});

app.listen(PORT, err => {
    if(err) {
        console.log(err);
    }
    connect();
    console.log(DB_URL);
    console.log('Listening on port ', PORT);
})