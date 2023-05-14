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
        Asana.find({author:data.author}).then((res)=>{
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
const updateAssana=(data,callback)=>{
    try{
        console.log(data.data.id);
        Asana.findOneAndUpdate({_id:data.data.id},{
            $set:{"catergory":data.data.catergory,"level":data.data.level,"description":data.data.description,"name":data.data.name}
        }).then((response) => {
            console.log("response",response);
            return callback(null,{data:response})
        })
    }catch(err){
        return callback({
            message:err.message,
        },null)
    }
    }
module.exports ={
    addAsana,
    findAssanas,
    updateAssana
}