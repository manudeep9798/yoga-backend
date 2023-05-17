const Asana=require('../models/asanas.model');
const Flow=require('../models/flow.model');
const Class=require('../models/class.model');


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
const updateAssana=async(data,callback)=>{
    try{
        console.log(data.data.id);
        const filter = {
    
            'assanas': { $elemMatch: { 'eachData.id': data.data.id } }
          };
        const filterClass = {
    
            'flow.assanas': { $elemMatch: { 'eachData.id': data.data.id } }
          };
        const update = {
            $set: {
              'assanas.$.eachData.name': data.data.name,
              'assanas.$.eachData.description': data.data.description,
              'assanas.$.eachData.catergory': data.catergory,
              'assanas.$.eachData.level': data.data.level,
              
            }
          };
        const updateClass = {
            $set: {
              'flow.assanas.$.eachData.name': data.data.name,
              'flow.assanas.$.eachData.description': data.data.description,
              'flow.assanas.$.eachData.catergory': data.catergory,
              'flow.assanas.$.eachData.level': data.data.level,
              
            }
          };

        await Flow.updateOne(filter, update)
        await Class.updateOne(filterClass, updateClass)

        Asana.findOneAndUpdate({_id:data.data.id},{
            $set:{"catergory":data.data.catergory,"level":data.data.level,"description":data.data.description,"name":data.data.name}
        }).then((response) => {
            // console.log("response",response);
            return callback(null,{data:response})
        })
    }catch(err){
        console.log(err)
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