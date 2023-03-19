const userService= require('../services/asana.service');
require('dotenv').config();



const addAsana = (req,res,next)=>{
    const data = req.body;
      
    userService.addAsana(data,(err,result)=>{
        if(err) return next(err);
        return res.status(200).send(result)
    })
}
const findAssanas = (req,res,next)=>{
    const data = req.body;
    userService.findAssanas(data,(err,result)=>{
        if(err) return next(err);
        return res.status(200).send(result)
    })
}

module.exports={
    addAsana,
    findAssanas
}