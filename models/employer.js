'use strict';
module.exports = (sequelize, DataTypes) => {
  const Op = sequelize.Op;
  const crypto = require('crypto');

  const Employer = sequelize.define('Employer', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    role : DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate :{
        isEmail:{
          args:true,
          msg:'email invalid'
        },
          uniqueEmail : function(email,next){
          Employer.find({
            where:{
              email: email,
              id: {
                [Op.ne]: this.id
              }
            },
          })
          .then((data)=>{
            if (data) {
              next('Email already exist!');
            } else {
              next();
            }
          })
          .catch((err)=>{
            console.log(err);
          });
        }
      }
    },
    password: {type: DataTypes.STRING,
      validate: {
        isEnoughLength(password) {
          if (password.length<7) {
            throw new Error('Min 7 Character!')
          }
        }
      }
    }
  }, {
    hooks :{
      beforeCreate(instances,options){
        instances.role = 'employer';
        const secret = this.email;
        const hash = crypto.createHmac('sha256', secret)
                   .update(this.password)
                   .digest('hex');

        this.password = hash;
      }

    }
  });
  Employer.associate = function(models) {
    Employer.belongsToMany(models.Employee,{ through: models.Job });
  };
  return Employer;
};