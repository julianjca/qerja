var express = require('express');
var router = require('express').Router();
var EmployerController = require('../controllers/EmployerController');
router.use( express.static( "public" ) );
const crypto = require('crypto');
const isLoginEmployer = require('../helper/authentication');



router.get('/', function(req, res) {
    let err = req.query.error;
    res.render('employerLogin',{
        error : err
    });
});

router.post('/',function(req, res) {
        let password = req.body.password;
        const secret = 'qerjalemburbagaiquda';
        const hash = crypto.createHmac('sha256', secret)
                    .update(password)
                    .digest('hex');
    EmployerController.findLogin(req.body.email,hash,req,res);

});

router.get('/register', function(req, res) {
    res.render('employerRegister');
});

router.get('/logout', function(req, res) {
    req.session.user = null;
    res.redirect('/employers');
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
    res.render('employerAddTask');
});

router.post('/addTask',function(req, res) {
    EmployerController.addTask(req, res);
});

router.get('/delete/:id', function(req, res) {
    EmployerController.deleteJob(req, res);
});

router.get('/edit/:id', function(req, res) {
    EmployerController.editJobGet(req, res);
});

router.post('/edit/:id', function(req, res) {
    EmployerController.editJob(req, res);
});


module.exports = router;