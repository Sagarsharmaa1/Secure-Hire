import express from "express"
import path from "path"

import { ENV } from "./lib/env.js";
import { connect } from "http2";
import { connectDB } from "./lib/db.js";
import cors from 'cors';

import {serve} from "inngest/express"

import { inngest, functions } from "./lib/inngest.js"; 
const app = express();

const __dirname = path.resolve()

//middleware
app.use(express.json())

app.use(cors({
    origin:ENV.CLINT_URL , credentials:true
}))

app.use("/api/inngest",serve({client:inngest,functions}))


app.get("/test" ,(req , res)=>{
    res.status(200).json({msg: "this is test  from api"})
})

app.get("/health" ,(req , res)=>{
    res.status(200).json({msg: "this is health details from api"})
})

//make our app ready for deployment 
if(ENV.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")))

    app.get("/{*any}",(req , res)=>{
        res.sendFile(path.join(__dirname,"../frontend/dist"))
    })
}

//server starting 

const startServer = async()=>{
try {
    await connectDB();
    app.listen(ENV.PORT,()=>{
    console.log(`server is running on port ${ENV.PORT}`);
    
})
    
} catch (error) {
    console.log("Error starting the server" , error);
    
}
}
startServer();