'use strict';
module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define('Employee', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    profession: DataTypes.STRING,
    rating: DataTypes.INTEGER,
    availability: DataTypes.INTEGER
  }, {});
  Employee.associate = function(models) {
    // associations can be defined here
  };
  return Employee;
};