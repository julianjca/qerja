function isLoginEmployer(req,res,next){
  if(req.session.user===null||req.session.user===undefined){
    res.redirect('/employers');
  }
  else{
    if(req.session.user.role==='employer'){
      console.log('masuk');
      next();
    } else{
      res.redirect('/employers');
    }
  }

}

module.exports = isLoginEmployer;