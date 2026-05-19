const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    return sequelize.define(
        "User",
        {
            name: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING(150),
                allowNull: false,
                validate: {
                    isEmail: true,
                },
            },
            phone: {
                type: DataTypes.STRING(30),
                allowNull: false,
            },
        },
        {
            timestamps: true,
            tableName: "users",
        },
    );
};
