var Employer = require('../models/').Employer;

class EmployerController {
    static register(req, res){
        Employer.create({
            first_name  : req.body.first_name,
            last_name   : req.body.last_name,
            email       : req.body.email,
            password    : req.body.password
        })
        .then(employer => {
            res.render('');
        })
        .catch(err => {
            res.send(err);
        })
    }

    static edit(req, res){
        Employer.update({
            first_name  : req.body.first_name,
            last_name   : req.body.last_name,
            email       : req.body.email,
            password    : req.body.password
        }, {where: {
            id : req.params.id
        }})
        .then(employer => {
            res.render('');
        })
        .catch(err => {
            res.send(err);
        })
    }

}

module.exports = EmployerController;