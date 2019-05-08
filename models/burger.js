

module.exports = (sequelize, DataTypes) => {
  let burgers = sequelize.define("burgers", {
    burger_name: {
      type: DataTypes.STRING,
      allowNull: false, 
      validate: {
        notNull: true
      }
    },
    devoured: {
      type: DataTypes.BOOLEAN, 
      defaultValue: false,
        validate: {
         isBoolean:function (val) {
          return (typeof(val)=='boolean')
             }
        }
    }
  });
  return burgers;
}