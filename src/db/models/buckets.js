'use strict';
module.exports = (sequelize, DataTypes) => {
  const buckets = sequelize.define('buckets', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    accessKey: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
  }, {});
  buckets.associate = function (models) {
    buckets.hasMany(models.files, { as: "files", foreignKey: "bucketId" })
    // associations can be defined here
  };
  return buckets;
};