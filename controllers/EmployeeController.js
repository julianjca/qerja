var Employee = require('../models/').Employee;
var Job = require('../models/').Job;
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
var template2 = fs.readFileSync('./views/mail2.html',{encoding:'utf-8'});
class EmployeeController {

    static register(req, res) {
        let password = req.body.password;
        const secret = 'qerjalemburbagaiquda';
        const hash = crypto.createHmac('sha256', secret)
                    .update(password)
                    .digest('hex');
        Employee.create({
            first_name  : req.body.first_name,
            last_name   : req.body.last_name,
            email       : req.body.email,
            password    : hash,
            profession  : req.body.profession
        })
        .then(employee => {
            const mailOptions = {
                from: '"Qerja" <qerjaworkspace@gmail.com>', // sender address
                to: req.body.email, // list of receivers
                subject: `Hello,`, // Subject line
                text: 'Hello world?', // plain text body
                html: template2 // html body
            };
                transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    res.redirect('/employers/dashboard');
                } else {
                    setTimeout(() => {
                        res.redirect('/employers/dashboard');
                    }, 2000);
                }
                });
            setTimeout(() => {
                res.redirect('/employees');

            }, 1500);
        })
        .catch(err => {
            res.render('employeeRegister',{
                errors : err.message
            });
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
            if(Object.keys(user).length === 0){
                res.redirect('/employees?error=Account or Password is wrong');

            } else{
                req.session.user = {
                    id: user.id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    role : user.role,
                    profession : user.profession
                };
                console.log(req.session.user);

                setTimeout(() => {
                    res.redirect('/employees/dashboard');
                }, 2000);
            }
        })
        .catch(err=>{
            res.redirect('/employees?error=Account or Password is wrong');
        });
    }

    static findAllJobs(req,res){
        Job.findAll(
            {
                attributes: [
                    'id',
                    'name',
                    'type',
                    'available'
                 ],
                where : {
                type : req.session.user.profession,
                available : true
            }}
        )
        .then(data =>{
            console.log(data);

            const userId = req.session.user.id;
            const userProfession = req.session.user.profession;
            Job.findAll({
                attributes: [
                    'id',
                    'name',
                    'type',
                    'available'
                 ],
                where : {EmployeeId:userId}
            })
            .then(data2=>{
                res.render('employeeDashboard',{
                    data : data,
                    userId :userId,
                    data2 : data2,
                    userprof : userProfession
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
        EmployeeId: req.params.id1,
        available : false
        }, {where: {
            id: req.params.id2
        }})
        .then(job => {
            res.redirect('/employees/Dashboard');
        })
        .catch(err => {
            res.send(err);
        });
    }

    static deleteJobDone(req, res){
        Job.destroy({where: {
            id: req.params.id
        }})
        .then(del => {
            res.redirect('/employees/Dashboard');
        })
        .catch(err => {
            res.send(err);
        });
    }

}

module.exports = EmployeeController;