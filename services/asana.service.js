const Asana=require('../models/asanas.model');
const auth = require('../middlewares/auth');


async function login({email,password},callback){
    const user = await StudentUser.findOne({email:email});
    if(user!=null){
        if(bcrypt.compareSync(password,user.password)){
            const token = auth.generateAccessToken(email);
            return callback(null, {...user.toJSON(),token});
        }
        else{
            return callback({
                message:"Invalid Username/Password!",
            })
        }
    }else{
        return  callback({
            message:"Invalid Username/Password!",
        })
    }
}
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
    login,
    addAsana,
    findAssanas
}