
import dotenv from 'dotenv';

import connectDB from "./db/index.js";   
import { DB_NAME } from "./constants.js";
import app from './app.js';

dotenv.config({path:`./.env`});

connectDB()
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`server is running at port : ${process.env.PORT}`)
    })

})
.catch((error)=>{
  console.log("Mongo Db connection failed !!!",error)
})




// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import express from "express";
// import { DB_NAME } from "./constants.js";

// // Configure dotenv
// dotenv.config();

// const app = express();

// (async ()=>{
//     try{
//    const mongoDbConnection = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME }`)
//    console.log(mongoDbConnection.connection.host);
//    app.on("error",(error)=>{
//     console.log("Error:",error)
//     throw err
//    })
//     }
    
//     catch(error){
//         console.log("Error:",error);
//         throw error
//     }

//     app.listen(process.env.PORT, ()=>{
//         console.log(`App is running on the port ${process.env.PORT}.....`)
//     })
// } )()
