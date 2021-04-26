const jwt=require('jsonwebtoken');
const User=require("../Models/User")

module.exports.varifyUser=function(req,res,next){
    // const token=req.headers.authorization.split(" ")[1];
    // console.log(token)
    try{
        const token=req.headers.authorization.split(" ")[1];
        // console.log(token)
        const decodedData=jwt.verify(token,'secretkey');
        User.findById({_id:decodedData.userId}).then(function(alldata){
            req.user=alldata;
            // console.log(req.user)
            next()
        }).catch(function(err){
            return res.status(201).json({success:false,msg:"Unauthorized access!!"})
        })
    }
    catch(err){
        return res.status(201).json({success:false,msg:"Unauthorized access!!"})
    }
}

//second gard
module.exports.varifyAdmin=function(req,res,next){
    if(!req.user){
        return res.status(201).json({success:false,msg:"Unauthorized access!!"})
    }
    else if(req.user.role!=='Admin'){
        return res.status(201).json({success:false,msg:"Unauthorized access!!"})
    }
    next()
}


module.exports.varifyParticularUser=function(req,res,next){
    if(!req.user){
        return res.status(201).json({success:false,msg:"Unauthorized access!!"})
    }
    else if(req.user.role!=='User'){
        return res.status(201).json({success:false,msg:"Unauthorized access!!"})
    }
    next()
}


module.exports.varifyAdminorUser=function(req,res,next){
    if(!req.user){
        return res.status(201).json({success:false,msg:"Unauthorized access!!"})
    }
    else if(req.user.role!=='Admin' && req.user.role!=='User'){
        return res.status(201).json({success:false,msg:"Unauthorized access!!"})
    }
    else if(req.user.role!=='User' || req.user.role!=='Admin'){
        next()
    }
}