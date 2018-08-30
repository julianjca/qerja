function isLoginEmployer(req,res,next){
  const login = req.session.user.role;
  if(login==='employer'){
    console.log('masuk');
    next();
  } else{
    res.redirect('/employers');
  }
}

module.exports = isLoginEmployer;