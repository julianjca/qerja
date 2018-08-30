function isLoginEmployee(req,res,next){
  const login = req.session.user.role;
  if(login==='employee'){
    next();
  } else{
    res.redirect('/employees');
  }
}

module.exports = isLoginEmployee;