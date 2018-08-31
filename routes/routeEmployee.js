var express = require('express');
var router = require('express').Router();
var EmployeeController = require('../controllers/EmployeeController');
router.use(express.static("public"));
const crypto = require('crypto');
const isLoginEmployee = require('../helper/authenticationEmployee');

router.get('/', function(req, res) {
    let err = req.query.error;
    res.render('employeeLogin',{
        error : err
    });
});

router.post('/',function(req, res) {
    let password = req.body.password;
    const secret = 'qerjalemburbagaiquda';
    const hash = crypto.createHmac('sha256', secret)
                .update(password)
                .digest('hex');
    EmployeeController.findLogin(req.body.email,hash,req,res);
});

router.get('/dashboard',isLoginEmployee, function(req, res) {
    EmployeeController.findAllJobs(req,res);
});

router.get('/logout', function(req, res) {
    req.session.user = null;
    res.redirect('/employees');
});

router.get('/register', function(req, res) {
    const error = [];
    res.render('employeeRegister',{
        errors : error
    });
});

router.post('/register', function(req, res) {
    EmployeeController.register(req, res);
});

router.get('/edit', function(req, res) {
    res.render('');
});

router.post('/edit', function(req, res) {
    EmployeeController.edit(req, res);
});

router.get('/takeJob/:id1/:id2',isLoginEmployee, function(req, res) { //employ  //job
    EmployeeController.takeJob(req, res);
});

router.get('/done/:id',isLoginEmployee, function(req, res) {
    EmployeeController.deleteJobDone(req, res);
});
module.exports = router;

