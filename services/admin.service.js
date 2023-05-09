const AdminSchema =require('../models/admin.model')
const bcrypt = require('bcrypt');
const auth = require('../middlewares/auth_student');


async function login({username,password},callback){
    const user = await AdminSchema.findOne({username:username});
    if(user!=null){
        console.log("here",bcrypt.compareSync(password,user.password));
        if(bcrypt.compareSync(password,user.password)){
            const token = auth.generateAccessToken(username);
            return callback(null, {...user.toJSON(),token});
            console.log('token',password);
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
    const user = new AdminSchema(params);
    user.save()
    .then((response) => {
        return callback(null,response)
    })
    .catch((err) => {
        return callback(err)
    })
}


module.exports ={
    login,
    register
}