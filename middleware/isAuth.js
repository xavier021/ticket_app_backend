const isAuth = (req,res,next) =>{
    if(!req.session.user){
        console.log(req.session)
        return res.status(403).json({data: "Not Authorized"});
    }
    next();
}

module.exports= isAuth;