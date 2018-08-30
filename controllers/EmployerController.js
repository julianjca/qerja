var Employer = require('../models/').Employer;
var Job = require('../models/').Job;
const crypto = require('crypto');


class EmployerController {
    static findAll(req,res){
        res.render('employerDashboard');

    }
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
            res.redirect('/employers');
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
    static addTask(req, res){
        Job.create({
            name: req.body.name,
            type: req.body.type
        })
        .then(job => {

        })
        .catch(err => {
            res.send(err);
        });
    }

    static findLogin(email,password,req,res){
        Employer.findOne(
            {where:{
                email:email,
                password:password}}
        )
        .then(user=>{
            console.log(user)
            console.log('masuk sini');
            req.session.user = {
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                role : user.role
            };

            console.log(req.session)
            res.redirect('/employers/dashboard');
        })
        .catch(err=>{
            res.send(err);
        });
    }
}

module.exports = EmployerController;