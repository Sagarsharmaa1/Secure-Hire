import express from "express"
import path from "path"

import { ENV } from "./lib/env.js";
const app = express();

const __dirname = path.resolve()

app.get("/books" ,(req , res)=>{
    res.status(200).json({msg: "this is books  from api"})
})

app.get("/health" ,(req , res)=>{
    res.status(200).json({msg: "this is health details from api"})
})

//make our app ready for deployment 
if(ENV.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"../Frontend/dist")))

    app.get("/{*any}",(req , res)=>{
        res.sendFile(path.join(__dirname,"../Frontend/dist"))
    })
}
app.listen(ENV.PORT,()=>{
    console.log(`server is running on port ${ENV.PORT}`);
    
})