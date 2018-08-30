var express = require('express');
var router = require('express').Router();
var EmployerController = require('../controllers/EmployerController');
router.use( express.static( "public" ) );
const crypto = require('crypto');
const isLoginEmployer = require('../helper/authentication');

router.get('/', function(req, res) {
    res.render('employerLogin');
});

router.post('/',function(req, res) {
    let password = req.body.password;
    const secret = req.body.email;
    const hash = crypto.createHmac('sha256', secret)
                .update(password)
                .digest('hex');
    EmployerController.findLogin(req.body.email,hash,req,res);
});

router.get('/register', function(req, res) {
    res.render('employerRegister');
});

router.post('/register', function(req, res) {
    EmployerController.register(req, res);
});

router.get('/dashboard',isLoginEmployer, function(req, res) {
    EmployerController.findAll(req,res);
});

router.post('/edit', function(req, res) {
    EmployerController.edit(req, res);
});

router.get('/addTask', isLoginEmployer,function(req, res) {
    EmployerController.addTask(req, res);
});


module.exports = router;