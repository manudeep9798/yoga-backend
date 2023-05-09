const bcryptjs = require('bcryptjs');
const userService= require('../services/student.services');
const JWT = require('jsonwebtoken');
require('dotenv').config();



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
const login = (req,res,next)=>{
    const {password,email} = req.body;
    userService.login({email,password},(err,result)=>{
        if(err) return next(err);
        return res.status(200).cookie('auth-token-yoga-student', process.env.ACCESS_TOKEN_SECRET_STUDENT + ' ' + result.token,{httpOnly: true}).send({
            message:"Success",
            token:result.token
        })
    })
}
const verifyLogin=async(req,res,next)=>{
    if(!req.headers['authorization']) return res.status(401).send({message:"Unauthorized"})
    const authHeader = await req.headers['authorization'];

    JWT.verify(authHeader, process.env.ACCESS_TOKEN_SECRET_STUDENT,(err,payload)=>{
        if(err) {
            return res.status(403).send({message:"Unauthorized1"+err.message})
        }
        req.payload=payload;
        res.status(200).send({
            message:"Success",
            loginStatus:true,
            user:req.payload.data
        })
    })
}
const BookingDetails = (req,res,next)=>{
    
    userService.BookingDetails(req.headers.username,(err,result)=>{
        if(err) return next(err);
        return res.status(200).json(result);
    })
}
const getAll = (req,res,next)=>{
    
    userService.getAll((err,result)=>{
        if(err) return next(err);
        return res.status(200).json(result);
    })
}
const deleteUser=async(req,res,next)=>{
    userService.deleteUser(req.body.id,(err,result)=>{
        if(err){
            res.status(400).json({err})
        }else{
            res.status(200).json({Author:result})
        }
    })
}
module.exports={
    register,
    login,
    verifyLogin,
    BookingDetails,
    getAll,
    deleteUser
}