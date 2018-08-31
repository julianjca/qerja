var Employer = require('../models/').Employer;
var Job = require('../models/').Job;
var Employee = require('../models/').Employee;

const crypto = require('crypto');
const nodeMailer = require('nodemailer');
var transporter = nodeMailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'qerjaworkspace@gmail.com',
        pass: 'Qerja1234'
    }
});
const fs =require('fs');
var template = fs.readFileSync('./views/mail.html',{encoding:'utf-8'});

class EmployerController {
    static findAll(req,res){
        Job.findAll(
            {
                attributes: [
                    'id',
                    'name',
                    'type',
                    'available'
                 ],
                 where : {EmployerId:req.session.user.id}
            }
        )
        .then(data=>{
            res.render('employerDashboard',{
                data : data
            });
        })
        .catch(err=>{
            res.send(err);
        });
    }

    static register(req, res){
        Employer.create({
            first_name  : req.body.first_name,
            last_name   : req.body.last_name,
            email       : req.body.email,
            password    : req.body.password
        })
        .then(employer => {
            setTimeout(() => {
                res.redirect('/employers');

            }, 1500);
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
            EmployerId : req.session.user.id,
            name: req.body.task_name,
            type: req.body.task_type,
        })
        .then(job => {
            Employee.findAll({
                attributes: [
                    'email',
                    'profession'
                 ],
                 where : {
                     profession : job.type
                 }
            })
            .then(data =>{
                let emails = '';
                for(let i = 0;i<data.length;i++){
                    if(i===data.length-1){
                        emails+= `${data[i].email}`;
                    } else{
                        emails+= `${data[i].email}, `;
                    }
                }
                const mailOptions = {
                    from: '"Qerja" <qerjaworkspace@gmail.com>', // sender address
                    to: emails, // list of receivers
                    subject: `Hello, ${job.type}`, // Subject line
                    text: 'Hello world?', // plain text body
                    html: template // html body
                };
                    transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        res.redirect('/employers/dashboard')                    } else {
                        setTimeout(() => {
                            res.redirect('/employers/dashboard');
                        }, 2000);
                    }
                    });
            })
            .catch(err=>{
                res.send(err);
            })
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
            console.log(user);
            req.session.user = {
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                role : user.role
            };
            setTimeout(() => {
                res.redirect('/employers/dashboard');
            }, 2000);
        })
        .catch(err=>{
            res.send(err);
        });
    }

    static deleteJob(req, res){
        Job.destroy({where : {
            id: req.params.id
        }})
        .then(del => {
            res.redirect('/employers/dashboard');
        })
        .catch(err => {
            res.send(err);
        });
    }

    static editJob(req, res){
        res.send(req.body);
        Job.update({
            name: req.body.task_name,
            type: req.body.task_type,
        }, {where: {
            id: req.params.id
        }})
        .then(job => {
            res.redirect('/employers/dashboard');
        })
        .catch(err => {
            res.send(err);
        });
    }

    static editJobGet(req, res){
        Job.findById(req.params.id)
        .then(job => {
            res.render('employerEditTask', {id: req.params.id});
        })
        .catch(err => {
            res.send(err);
        });
    }
}

module.exports = EmployerController;