const bcryptjs = require('bcryptjs');
const userService= require('../services/asana.service');
const JWT = require('jsonwebtoken');
require('dotenv').config();



const login = (req,res,next)=>{
    const {password,email} = req.body;

    userService.login({email,password},(err,result)=>{
        if(err) return next(err);
        return res.status(200).cookie('auth-token-yoga', process.env.ACCESS_TOKEN_SECRET + ' ' + result.token,{httpOnly: true}).send({message:"Success"})
    })
}
const addAsana = (req,res,next)=>{
    const data = req.body;
      
    userService.addAsana(data,(err,result)=>{
        if(err) return next(err);
        return res.status(200).send(result)
    })
}


module.exports={
    addAsana,
}