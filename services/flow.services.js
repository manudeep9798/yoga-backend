const { ObjectId } = require('mongodb');
const Flow=require('../models/flow.model');
const Teacher=require('../models/teacher.model');

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
    if(data.id){
        // return callback(null,{data:data.id})
        Flow.find({"_id":new ObjectId(data.id)}).then((res)=>{
            return callback(null,{data:res})
         })
    }else{
        Flow.find().then((res)=>{
           return callback(null,{data:res})
        })
    }

}
const getAuthor=(data,callback)=>{
    if(data){
        Teacher.findOne({email:data.id}).then((res)=>{
            return callback(null,{data:res})
        })
    }
}
module.exports ={
    addFlow,
    getFlows,
    getAuthor
}