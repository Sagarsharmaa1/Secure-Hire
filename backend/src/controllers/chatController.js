import { chatClient } from "../lib/stream.js";

export async function getStreamToken(req , res){
    try {

        //use clerkID for stream(not mongoDb _id ) => it should match the id we have in the stream dashboard
        const token = chatClient.createToken(req.user.clerkId)

        res.status(200).json({
           token,
           userId:req.user.clerkId,
           userName:req.user.name,
           userImage:req.user.image
        })
    } catch (error) {
        res.status(500).json({
            msg:"Internal server Error"
        });
    }
}