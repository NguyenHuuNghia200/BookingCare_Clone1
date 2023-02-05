'use strict';
const {
  Model
} = require('sequelize');
const  Sequelize  = require('.');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
      User.belongsTo(models.Allcodes,{foreignKey:'positionId',targetKey:'key',as:'positionIdData'})
      User.belongsTo(models.Allcodes,{foreignKey:'gender',targetKey:'key',as:'genderData'})
      
    }
  };
  User.init({
    
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    address:DataTypes.STRING,
    gender:DataTypes.STRING,
    roleid:DataTypes.STRING,
    phonenumber:DataTypes.STRING,
    positionId:DataTypes.STRING,
    image:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};