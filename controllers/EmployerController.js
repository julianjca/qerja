var Employer = require('../models/').Employer;
const crypto = require('crypto');


class EmployerController {
    static register(req, res){
        const secret = req.body.email;
        const hash = crypto.createHmac('sha256', secret)
                   .update(req.body.password)
                   .digest('hex');
        Employer.create({
            first_name  : req.body.first_name,
            last_name   : req.body.last_name,
            email       : req.body.email,
            password    : hash
        })
        .then(employer => {
            res.render('employerLogin');
        })
        .catch(err => {
            res.send(err);
        });
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
        });
    }

}

module.exports = EmployerController;