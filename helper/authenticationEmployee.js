function isLoginEmployee(req,res,next){
  if(req.session.user===null||req.session.user===undefined){
    res.redirect('/employees');
  } else{
    if(login==='employee'){
      next();
    } else{
      res.redirect('/employees');
    }
  }
}

module.exports = isLoginEmployee;