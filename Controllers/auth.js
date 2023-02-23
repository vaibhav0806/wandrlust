const User = require("../Models/user");
const { bcrypt } = require("bcrypt");
const { jwt } = require("jsonwebtoken");

const register = async(req,res,next) =>{
    try{
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.password,salt);
        const newUser = new User({
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            age: req.body.age,
            gender: (req.body.gender ? req.body.gender : "")
        })
        await newUser.save();
        res.status(200).send("Your account has been Created!");
    }
    catch(err){
        next(err);
    }
}

const login = async(req,res,next) =>{
    try{
        const user = await User.findOne({
            username: req.body.username
        });
        if(!user){
            return next()
        }
    }
    catch(err){

    }
}