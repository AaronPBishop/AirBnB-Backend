'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    static associate(models) {
      Image.belongsTo(models.User, { foreignKey: 'userId', constraints: false })
      Image.belongsTo(models.Spot, { foreignKey: 'spotId', constraints: false })
      Image.belongsTo(models.Review, { foreignKey: 'reviewId', constraints: false })
    }
  }
  Image.init({
    userId: {
      type: DataTypes.INTEGER
    },
    spotId: {
      type: DataTypes.INTEGER
    },
    reviewId: {
      type: DataTypes.INTEGER
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    preview: {
      type: DataTypes.BOOLEAN,
    },
  }, {
    sequelize,
    modelName: 'Image',
  });
  return Image;
};