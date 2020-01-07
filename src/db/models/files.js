'use strict';
module.exports = (sequelize, DataTypes) => {
  const files = sequelize.define('files', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    link: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    bucketId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: true
      }
    }
  }, {});
  files.associate = function (models) {
    files.belongsTo(models.buckets, { as: "bucket" })
  };
  return files;
};