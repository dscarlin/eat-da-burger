

module.exports = (sequelize, DataTypes) => {
  let burgers = sequelize.define("burgers", {
    burger_name: {type: DataTypes.STRING, allowNull: false},
    devoured: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false}
  });
  return burgers
}