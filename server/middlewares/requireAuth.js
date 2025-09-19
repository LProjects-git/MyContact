const jwt=require('jsonwebtoken');
require('dotenv').config();

const requireAuth=(req,res,next)=>{
    const authHeader=req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({message:'Authorization missing'});
    }

    const token=authHeader.split(' ')[1];

    try{
        const decoded=jwt.verify(token,process.env.secretkey);
        req.user=decoded;
        next();
    } catch(error){
        return res.status(401).json({message:'Invalid token'});
    }
};
module.exports=requireAuth;