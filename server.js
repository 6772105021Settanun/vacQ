const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');

//Load env vars
dotenv.config({path:'./config/config.env'});

//Connect to database
connectDB();

//Route files
const hospitals =require('./routes/hospitals');
const auth = require('./routes/auth');

const app=express();

//Body parser
app.use(express.json());

//Cookie parser
app.use(cookieParser());

//Mount routers
app.use('/api/v1/hospitals',hospitals);
app.use('/api/v1/auth', auth);

const PORT=process.env.PORT || 5000;
//app.listen(PORT, console.log('Server running in ', process.env.NODE_ENV, ' mode on port ', PORT));
const server = app.listen(PORT, console.log('Server running in ', process.env.NODE_ENV, ' mode on port ', PORT));

//Handle unhandled promise rejections
process.on('unhandledRejection',(err,promise)=>{
    console.log(`Error: ${err.message}`);
    
    //close server & exit process 
    server.close(()=>process.exit(1));
});