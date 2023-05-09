const bcryptjs = require('bcryptjs');
const userService= require('../services/admin.service');
const JWT = require('jsonwebtoken');
require('dotenv').config();


const login = (req,res,next)=>{
    // res.status(200).send({message:"hiii"})
    const {password,username} = req.body;
    userService.login({username,password},(err,result)=>{
        if(err) return next(err);
        return res.status(200).cookie('auth-token-yoga-student', process.env.ACCESS_TOKEN_SECRET_STUDENT + ' ' + result.token,{httpOnly: true}).send({
            message:"Success",
            token:result.token
        })
    })
}
const register = (req,res,next)=>{
    const {password} = req.body;
    const salt=bcryptjs.genSaltSync(10);
    req.body.password = bcryptjs.hashSync(password,salt);
    userService.register(req.body,(err,result)=>{
        if(err) return next(err);
        return res.status(200).send({
            message:"Success",
            data:result,
        })
    })
}

module.exports={
    login,
    register
}