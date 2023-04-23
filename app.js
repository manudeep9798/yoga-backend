require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const StudentRoute = require('./routes/students.route')
const teacherRoute = require('./routes/teacher.route')
const asanas = require('./routes/asana.route')
const flow = require('./routes/flow.routes')
const classes = require('./routes/class.route')
var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}))
app.use(express.json());
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            
    optionSuccessStatus:200
}
app.use(cors(corsOptions))
app.options('*', cors())
const startApp=async()=>{
    //starting the server
    app.use(express.json({limit:'50mb'}));
    await app.listen(4000,()=>console.log(`on port 4000`))
    //connecting to mongodb server
    mongoose.set("strictQuery", false);
    const db=await mongoose.connect(`mongodb://manudeep:${process.env.MONGO_PASS}@cluster0-shard-00-00.2ohia.mongodb.net:27017,cluster0-shard-00-01.2ohia.mongodb.net:27017,cluster0-shard-00-02.2ohia.mongodb.net:27017/yoga?ssl=true&replicaSet=atlas-ry441s-shard-0&authSource=admin&retryWrites=true&w=majority`,{
        useNewUrlParser: true,useUnifiedTopology: true
    },(err)=>{
        if(err)console.log('error is ', err)
        else console.log('connected to database')
    })
    app.use('/student',StudentRoute)
    app.use('/teacher',teacherRoute)
    app.use('/asanas',asanas)
    app.use('/flow',flow)
    app.use('/class',classes)
}



startApp();