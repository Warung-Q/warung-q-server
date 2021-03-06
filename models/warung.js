'use strict'
module.exports = (sequelize, DataTypes) => {
  const { Model } = require('sequelize')

  class Warung extends Model {}

  Warung.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: 'warung name cannot be null'
          },
          notEmpty: {
            args: true,
            msg: 'warung name cannot be empty'
          }
        }
      },
      OwnerId: {
        type: DataTypes.INTEGER
      },
      ManagerId: {
        type: DataTypes.INTEGER
      }
    },
    {
      sequelize
    }
  )

  Warung.associate = function(models) {
    // associations can be defined here
    Warung.belongsTo(models.Owner)
    Warung.hasMany(models.Product)
    Warung.hasMany(models.News)
    // Warung.belongsTo(models.Manager)
  }
  return Warung
}
