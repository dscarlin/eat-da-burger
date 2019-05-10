module.exports = (sequelize, DataTypes) => {
    let Customer = sequelize.define('Customers', {
        customer_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: true
            }
        }
        
    });
    return Customer;
}