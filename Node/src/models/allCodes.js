'use strict';
const {
  Model
} = require('sequelize');
const  Sequelize  = require('.');
module.exports = (sequelize, DataTypes) => {
  class Allcodes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
      Allcodes.hasMany(models.User,{foreignKey:'positionId',as:'positionIdData'})
      Allcodes.hasMany(models.User,{foreignKey:'gender',as:'genderData'})
    }
  };
  Allcodes.init({
    
    key: DataTypes.STRING,
    type: DataTypes.STRING,
    valueEn:DataTypes.STRING,
    valueVN:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Allcodes',
  });
  return Allcodes;
};