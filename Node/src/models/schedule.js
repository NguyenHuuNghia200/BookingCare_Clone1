'use strict';
const {
  Model
} = require('sequelize');
const Sequelize = require('.');
module.exports = (sequelize, DataTypes) => {
  class schedules extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      schedules.belongsTo(models.Allcodes, { foreignKey: 'timeType', targetKey: 'key', as: 'timeTypeData' })
    }
  };
  schedules.init({

    currentNumber: DataTypes.INTEGER,
    maxNumber: DataTypes.INTEGER,
    date: DataTypes.STRING,
    timeType: DataTypes.STRING,
    doctorId: DataTypes.INTEGER,

  }, {
    sequelize,
    modelName: 'schedules',
  });
  return schedules;
};