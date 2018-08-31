function isLoginEmployee(req,res,next){
  if(req.session.user===undefined){
    res.redirect('/employees');
  } else{
    if(req.session.user==='employee'){
      next();
    } else{
      res.redirect('/employees');
    }
  }
}

module.exports = isLoginEmployee;