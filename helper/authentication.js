function isLoginEmployer(req,res,next){
  console.log(req.session.user);
  if(req.session.user===null||req.session.user===undefined){
    res.redirect('/employers');
  }
  else{
    if(req.session.user.role==='employer'){
      console.log(req.session.user);
      next();
    } else{
      res.redirect('/employees?error=You are not an employer');
    }
  }

}

module.exports = isLoginEmployer;