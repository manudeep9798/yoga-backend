const TeacherUser=require('../models/teacher.model');
const bcrypt = require('bcrypt');
const auth = require('../middlewares/auth_teacher');


async function login({email,password},callback){
    const user = await TeacherUser.findOne({email:email});
    if(user===null){
        return  callback({
            message:"Invalid Username/Password!",
        })
    }else{
        if(bcrypt.compareSync(password,user.password)){
            const token = auth.generateAccessToken(email);
            return callback(null, {...user.toJSON(),token,data:user});
        }
        else{
            return callback({
                message:"Invalid Username/Password!",
            })
        }
    }
    // if(user!=null){
    //     if(bcrypt.compareSync(password,user.password)){
    //         const token = auth.generateAccessToken(email);
    //         return callback(null, {...user.toJSON(),token});
    //     }
    //     else{
    //         return callback({
    //             message:"Invalid Username/Password!",
    //         })
    //     }
    // }else{
    //     return  callback({
    //         message:"Invalid Username/Password!",
    //     })
    // }
}


async function register(params,callback){
    if(params.username===undefined ){
        return callback({message:"Username is required"})
    }
    const user = new TeacherUser(params);
    user.save()
    .then((response) => {
        return callback(null,response)
    })
    .catch((err) => {
        return callback(err)
    })
}
const findAuthor=async(id,cb)=>{
    try{
        const user = await TeacherUser.findOne({email:id});
        cb(null,user.username)
    }catch(err){
        cb(err,null)
    }

}
async function getAll(callback){
    TeacherUser.find().then((response) => {
       
            return callback(null,{data:response})
    })
    
}
async function verify(data,callback){
    TeacherUser.findOneAndUpdate({_id:data},{
        $set:{"verified":true}
    }).then((response) => {
        callback(null,response)
    })
    
}
async function deleteUser(data,callback){
    TeacherUser.findOneAndDelete({_id:data}).then((response) => {
        callback(null,response)
    })
    
}
module.exports ={
    login,
    register,
    findAuthor,
    getAll,
    verify,
    deleteUser
}