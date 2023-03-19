const Flow=require('../models/flow.model');
const auth = require('../middlewares/auth');

const addFlow=async (data,callback)=>{
    try{
        const flow = new Flow(data);
        flow.save()
        .then((response) => {
            return callback(null,response)
        })
        .catch((err) => {
            return callback(err)
        })

    }catch(err){
        return callback({
            message:err.message,
        },null)
    }
    
}

module.exports ={
    addFlow
}