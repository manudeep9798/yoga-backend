const Flow=require('../models/flow.model');

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
const getFlows=(data,callback)=>{
     Flow.find().then((res)=>{
        return callback(null,{data:res})
     })

}
module.exports ={
    addFlow,
    getFlows
}