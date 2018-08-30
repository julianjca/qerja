'use strict';
module.exports = (sequelize, DataTypes) => {
  const Op = sequelize.Op;

  const Employer = sequelize.define('Employer', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
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
    password: DataTypes.STRING
  }, {});
  Employer.associate = function(models) {
    Employer.belongsToMany(models.Employee,{ through: models.Job });
  };
  return Employer;
};