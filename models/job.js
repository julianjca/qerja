'use strict';
module.exports = (sequelize, DataTypes) => {
  const Job = sequelize.define('Job', {
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    EmployeeId: DataTypes.INTEGER,
    EmployerId: DataTypes.INTEGER
  }, {});
  Job.associate = function(models) {
    // associations can be defined here
  };
  return Job;
};