function isLoginEmployee(req,res,next){
  if(req.session.user===null||req.session.user===undefined){
    console.log(req.session.user);
    res.redirect('/employees');
  } else{
    if(req.session.user.role==='employee'){
      next();
    } else{
      res.redirect('/employees?error=You are not an employee');
    }
  }
}

module.exports = isLoginEmployee;