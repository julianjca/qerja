var Employee = require('../models/').Employee;
var Job = require('../models/').Job;
const crypto = require('crypto');
class EmployeeController {

    static register(req, res) {
        const secret = req.body.email;
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

    static findLogin(email,password,req,res){
        Employee.findOne(
            {where:{
                email:email,
                password:password}}
        )
        .then(user=>{
            req.session.user = {
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                role : user.role,
                profession : user.profession
            };

            res.redirect('/employees/dashboard');
        })
        .catch(err=>{
            res.send(err);
        });
    }

    static findAllJobs(req,res){
        Job.findAll(
            {where : {
                type : req.session.user.profession
            }}
        )
        .then(data =>{
            const userId = req.session.user.id;
            Job.findAll({
                where : {EmployeeId:userId}
            })
            .then(data2=>{
                res.render('employeeDashboard',{
                    data : data,
                    userId :userId,
                    data2 : data2
                });
            })
            .catch(err=>{
                res.send(err);
            })
        })
        .catch(err=>{
            res.send(err);
        })
    }

    static takeJob(req, res){
        Job.update({
        EmployeeId: req.params.id1
        })
    }

}

module.exports = EmployeeController;