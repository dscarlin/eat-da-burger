

module.exports = (sequelize, DataTypes) => {
  let burgers = sequelize.define("burgers", {
    burger_name: {
      type: DataTypes.STRING,
      allowNull: false, 
      validate: {
        notNull: true,
        len: [2,100]
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

  burgers.associate = (models) => {
    burgers.belongsTo(models.Customers, {
    });
  };  


  return burgers;
}