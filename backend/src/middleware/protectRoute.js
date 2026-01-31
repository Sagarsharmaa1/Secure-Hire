import { requireAuth } from '@clerk/express'
import User from '../models/User.js'

export const protectRoute =[
    requireAuth(),
    async (req ,res ,next) =>{
        try {
            const clerkId = req.auth().userId;
            if(!clerkId) return res.status(401).json({
                msg:"Unauthorized - invalid token"
            })

            //find user in DB by clerk ID
            const user = await User.findOne({clerkId})

            if(!user) return res.status(404).json({
                msg:"User not found"
            })

            //attach user to req 
            req.user = user

            next() //it is used when middleware pass then further section continue (req is continue) in the routes (in server.js)
        } catch (error) {
            console.error("Error in protectRoute middleware",error);
            res.status(500).json({
                msg:"Internal server error"
            });
        }
    }

]

// requireAuth({signInUrl:"/sign-in"}) this is  custom redirect when it block the req 
