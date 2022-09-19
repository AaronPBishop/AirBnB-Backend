'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Review.hasMany(models.Image, { as: 'ReviewImages', foreignKey: 'reviewId', onDelete: 'CASCADE' });
      Review.belongsTo(models.User, { foreignKey: 'userId', constraints: false });
      Review.belongsTo(models.Spot, { foreignKey: 'spotId', constraints: false });
    }
  }
  Review.init({
    userId:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    review: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len:[2, 1000],
        notEmpty: {
          msg: 'Review text is required'
        },
      }
    },
    stars: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};