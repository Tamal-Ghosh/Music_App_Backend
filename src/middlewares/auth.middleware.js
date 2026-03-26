const jwt = require("jsonwebtoken")

async function authArtiest(req,res) {
    const token = req.cookies.token
        if(!token)
        {
            return res.status(401).json({
                message:"Unauthorized"
            })
        }
    
        
    
        try {
            const decoded= jwt.verify(token,process.env.JWT_SECRET)
            if(decoded.role !== "artist")
            {
                return res.status(403).json({
                    message : "you don't have access to create an album"
                })
            }
            
        } catch (error) {
            console.log(error);
            return res.status(401).json({message: "Unauthorized and not matched"})
            
        }

        module.exports=authArtiest
}