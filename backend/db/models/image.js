'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Image.belongsTo(models.User)
      Image.belongsTo(models.Spot)
      Image.belongsTo(models.Review)
    }
  }
  Image.init({
    userId: DataTypes.INTEGER,
    spotId: DataTypes.INTEGER,
    reviewId: DataTypes.INTEGER,
    preview: DataTypes.BOOLEAN,
    url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Image',
  });
  return Image;
};