'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Course,{
        through: 'Cart',
        foreignKey: 'orderId',
        otherKey: 'courseId',
        as: 'cart',
      })

      this.belongsTo(models.User,{
        foreignKey: 'userId',
        as: 'user'
      })
    }
  }
  order.init({
    date: DataTypes.DATE,
    total: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    status: {
      type : DataTypes.STRING,
      defaultValue : "pendiente",
      validate : {
        isIn : {
          args : ["pending","completed","canceled"],
          msg : "Los valores validos son pending, completed y canceled"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Order',
  });
  return order;
};