var Employee = require('../models/').Employee;
var Job = require('../models/').Jobs;
const crypto = require('crypto');
class EmployeeController {

    static register(req, res) {
        const secret = req.body.email;
        res.send(req.body);
        const hash = crypto.createHmac('sha256', secret)
                   .update(req.body.password)
                   .digest('hex');
        Employee.create({
            first_name  : req.body.first_name,
            last_name   : req.body.last_name,
            email       : req.body.email,
            password    : hash,
            profession  : req.body.profession
        })
        .then(employee => {
            res.redirect('/employees');
        })
        .catch(err => {
            res.send(err);
        });
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
            res.send(err);
        });
    }

    static JobList(req, res){
        Job.findAll()
        .then(jobs => {

        })
        .catch(err => {
            res.send(err);
        });
    }


}

module.exports = EmployeeController;