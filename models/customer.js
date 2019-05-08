module.exports = (sequelize, DataTypes) => {
    let Customer = sequelize.define('Customers', {
        customer_name: {
            type: DataTypes.STRING, 
            validate: {
                allowNull: false
            }
        }

    });
    return Customer;
}