'use strict';
const {
  Model
} = require('sequelize');
const  Sequelize  = require('.');
module.exports = (sequelize, DataTypes) => {
  class markdown extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      markdown.belongsTo(models.User,{foreignKey:'DoctorId'})
    }
  };
  markdown.init({
    
    contentHtml: DataTypes.TEXT('long'),
    contentMarkdown: DataTypes.TEXT('long'),
    DoctorId: DataTypes.INTEGER,
    description:DataTypes.TEXT('long'),
    specialtyId:DataTypes.INTEGER,
    clinicId:DataTypes.INTEGER,
    
  }, {
    sequelize,
    modelName: 'markdown',
  });
  return markdown;
};