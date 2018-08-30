'use strict';
module.exports = (sequelize, DataTypes) => {
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
      }
    }
  });
  Employee.associate = function(models) {
    Employee.belongsToMany(models.Employer,{ through: models.Job });
  };
  return Employee;
};