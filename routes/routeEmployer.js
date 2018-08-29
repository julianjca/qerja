var express = require('express');
var router = require('express').Router();
var EmployerController = require('../controllers/EmployerController');
router.use( express.static( "public" ) );

router.get('/', function(req, res) {
    res.render('employerLogin');
});

router.get('/register', function(req, res) {
    res.render('');
});

router.post('/register', function(req, res) {
    EmployerController.register(req, res);
});

router.get('/edit', function(req, res) {
    res.render('');
});

router.post('/edit', function(req, res) {
    EmployerController.edit(req, res);
});



module.exports = router;