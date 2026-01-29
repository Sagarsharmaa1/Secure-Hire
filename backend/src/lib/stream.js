import {StreamChat} from "stream-chat"
import { ENV } from "./env.js"

const apikey = ENV.STREAM_API_KEY
const apiSecret = ENV.STREAM_SECRET_KEY

if(!apikey || !apiSecret){
    console.error("Stream api key or stream_secret is missing") 
}

export const chatClient = StreamChat.getInstance(apikey,apiSecret);

export const upsertStreamUser = async(userdata) =>{
    try {
        await chatClient.upsertUser(userdata)
        console.log("stream user upserted successfully",userdata);
    } catch (error) {
        console.error("Error upserting stream error",error);
        
    }
}


export const deleteStreamUser = async(userId) =>{
    try {
        await chatClient.deleteUser(userId)
        console.log("stream user deleted successfully",userId);
        
    } catch (error) {
        console.error("Error deleting stream error",error);
        
    }
}

//todo: add another method to genrateToken

