const StudentUser=require('../models/student.model');
const Classes=require('../models/class.model');
const bcrypt = require('bcrypt');
const auth = require('../middlewares/auth_student');


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


async function register(params,callback){
    if(params.username===undefined ){
        return callback({message:"Username is required"})
    }
    const user = new StudentUser(params);
    user.save()
    .then((response) => {
        return callback(null,response)
    })
    .catch((err) => {
        return callback(err)
    })
}
async function BookingDetails(username,callback){
    console.log(username);
    StudentUser.findOne({email:username}).then((response) => {
        Classes.find({_id:response?.wishList}).then((res) => {
            return callback(null,{data:res})
        })
    })
    
}
async function getAll(callback){
    StudentUser.find().then((response) => {
       
            return callback(null,{data:response})
    }) 
}
async function deleteUser(data,callback){
    StudentUser.findOneAndDelete({_id:data}).then((response) => {
        callback(null,response)
    })
}
async function getList(data,callback){
    StudentUser.find({email:data}).then((response) => {
        callback(null,response)
    })
}
module.exports ={
    login,
    register,
    BookingDetails,
    getAll,
    deleteUser,
    getList
}