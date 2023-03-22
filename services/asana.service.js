const Asana=require('../models/asanas.model');


const addAsana=async (data,callback)=>{
    try{
        const asana = new Asana(data);
        asana.save()
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
const findAssanas=async (data,callback)=>{
    try{
        if(data.query){
            Asana.find({name:{$regex : data.query}}).then((res)=>{
                return callback(null,res)
            })
            .catch((err)=>{
                return callback({
                    message:err.message,
                },null)
            })
       }else{
        Asana.find().then((res)=>{
            return callback(null,res)
        })
        .catch((err)=>{
            return callback({
                message:err.message,
            },null)
        })
       }

    }catch(err){
        return callback({
            message:err.message,
        },null)
    }
}
module.exports ={
    addAsana,
    findAssanas
}