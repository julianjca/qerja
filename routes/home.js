const router = require('express').Router();
var express = require('express');

router.use( express.static( "public" ) );

router.get('/',(req,res)=>{
  res.render('home');
});

module.exports = router;