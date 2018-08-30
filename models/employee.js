'use strict';
module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define('Employee', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    profession: DataTypes.STRING,
    rating: DataTypes.INTEGER,
    availability: DataTypes.INTEGER
  }, {
    hooks: {
      beforeCreate(instance, options){
        instance.availability = 1;
        instance.rating = 1;
      }
    }
  });
  Employee.associate = function(models) {
    Employee.belongsToMany(models.Employer,{ through: models.Job });
  };
  return Employee;
};