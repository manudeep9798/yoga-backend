const userService= require('../services/class.service');
require('dotenv').config();



const addClass = (req,res,next)=>{
    const data = req.body;
    userService.addClass(data,(err,result)=>{
        if(err) return next(err);
        return res.status(200).send(result)
    })
}
const getClass=(req,res,next)=>{
    const data = req.body;
    userService.getClass(data,(err,result)=>{
        if(err) return next(err);
        return res.status(200).send(result)
    })
}

module.exports={
    addClass,
    getClass
}