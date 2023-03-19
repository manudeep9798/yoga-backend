const userService= require('../services/flow.services');
require('dotenv').config();



const addFlow = (req,res,next)=>{
    const data = req.body;
      
    userService.addFlow(data,(err,result)=>{
        if(err) return next(err);
        return res.status(200).send(result)
    })
}

module.exports={
    addFlow
}