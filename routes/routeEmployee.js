var express = require('express');
var router = require('express').Router();
var EmployeeController = require('../controllers/EmployeeController');
router.use(express.static("public"));


router.get('/', function(req, res) {
    res.render('employeeLogin');
});

router.get('/register', function(req, res) {
    res.render('');
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

module.exports = router;

