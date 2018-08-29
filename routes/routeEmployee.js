var router = require('express').Router()
var EmployeeController = require('../controllers/EmployeeController');

router.get('/', function(req, res) {
    res.render('employeeLogin');
})
router.get('/register', function(req, res) {
    EmployeeController.register(req, res);
})





module.exports = router