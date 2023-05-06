const { data } = require('jquery');
const userService= require('../services/flow.services');
require('dotenv').config();


const addFlow = (req,res,next)=>{
    const data = req.body;
      
    userService.addFlow(data,(err,result)=>{
        if(err) return next(err);
        return res.status(200).send(result)
    })
}
const getFlows = (req,res,next)=>{
    const data = req.body || {};
    userService.getFlows(data,(err,result)=>{
        if(err) return next(err);
        return res.status(200).send(result)
    })
}
const getOneFlow = (req,res,next)=>{
    const data = req.body || {};
    userService.getFlows(data,(err,result)=>{
        if(err) return next(err);
        return res.status(200).send(result)
    })
}
const getAuthor=(req,res,next)=>{
    const data=req.body
    userService.getAuthor(data,(err,result)=>{
        if(err) return next(err);
        return res.status(200).send(result)
    })
}
const updateFlow=(req,res,next)=>{
    const data=req.body
    userService.updateFlow(data,(err,result)=>{
        if(err) return next(err);
        return res.status(200).send(result)
    })
}
module.exports={
    addFlow,
    getFlows,
    getAuthor,
    getOneFlow,
    updateFlow,
}