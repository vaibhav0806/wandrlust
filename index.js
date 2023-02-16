const express = require('express');
const path = require('path');
const {DB_URL} = require("./config");
const User = require("./Models/user");
const {mongoose} = require("mongoose");

const app = express();

app.use(express.static(path.join(__dirname, 'public')))
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
// Testing Function
// const createUser = async (req,res,next) =>{
//     console.log("Working?");
//     try{
//         console.log("Inside");
//         const testUser = await new User({
//             name: "TestName",
//             phone: 8473973458,
//             email: "test@gmail.com",
//             username: "flamekaiser",
//             password: "test12345",
//         }).save() 

//         console.log(testUser);
//     }
//     catch(err){
//         console.log(err);
//     }
// }

mongoose.connection.on("disconnected", ()=>{
    console.log("Mongodb Disconnected.")
})

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/about', (req, res) => {
    res.render('about')
});

app.get('/test', (req, res) => {
    res.render('test');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/signup', (req, res) => {
    res.render('signup')
});

app.get('*', function(req, res){
    res.render('error');
});

app.listen(PORT, err => {
    if(err) {
        console.log(err);
    }
    connect();
    console.log('Listening on port ', PORT);
    // createUser();
    console.log("User Entry Added");
})