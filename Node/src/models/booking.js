'use strict';
const {
  Model
} = require('sequelize');
const  Sequelize  = require('.');
module.exports = (sequelize, DataTypes) => {
  class booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  booking.init({
    
    statusId: DataTypes.STRING,
    patientid: DataTypes.INTEGER,
    doctorId: DataTypes.INTEGER,
    date:DataTypes.DATE,
    timeType:DataTypes.STRING
    
  }, {
    sequelize,
    modelName: 'booking',
  });
  return booking;
};