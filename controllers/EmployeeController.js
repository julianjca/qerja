var Employee = require('../models/').Employee;

class EmployeeController {  
    
    static register(req, res) {

        Employee.create({
            first_name  : req.body.first_name,
            last_name   : req.body.last_name,
            email       : req.body.email,
            password    : req.body.password,
            profession  : req.body.profession,
            rating      : req.body.rating,
            availability: req.body.availability
        })
        .then(employee => {

        })
        .catch(err => {

        })
    }
    static edit(req, res){
        Employee.update({
            first_name  : req.body.first_name,
            last_name   : req.body.last_name,
            email       : req.body.email,
            password    : req.body.password,
            profession  : req.body.profession,
            rating      : req.body.rating,
            availability: req.body.availability,
            updatedAt   : new Date()
        }, {where: {
            id : req.params.id
        }})
        .then(employee => {

        })
        .catch(err => {

        })
    }




}

module.exports = EmployeeController;