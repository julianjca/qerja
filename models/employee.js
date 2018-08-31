'use strict';
module.exports = (sequelize, DataTypes) => {
  const crypto = require('crypto');

  const Employee = sequelize.define('Employee', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'not email format'
        }
      }
    },
    password: {type: DataTypes.STRING,
      validate: {
        min: {
          args: 7,
          msg: 'min 7 karakter'
        }
      }
    },
    profession: DataTypes.STRING,
    rating: DataTypes.INTEGER,
    availability: DataTypes.INTEGER,
    role : DataTypes.STRING
  }, {
    hooks: {
      beforeCreate(instance, options){
        instance.availability = 1;
        instance.rating = 1;
        instance.role = 'employee';
      },
      afterValidate(instace,options){
        let password = instace.password;
        const secret = instace.email;
        const hash = crypto.createHmac('sha256', secret)
                    .update(password)
                    .digest('hex');
                    instace.password = hash;
      }
    }
  });
  Employee.associate = function(models) {
    Employee.belongsToMany(models.Employer,{ through: models.Job });
  };
  return Employee;
};