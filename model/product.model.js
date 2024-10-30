// models/product.model.js
const { DataTypes } = require("sequelize");
const sequelize = require("../database/connectDb");
const userSchema = require("./user.model");

const productSchema = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true, // Ensure the name is not empty
        },
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true, // Description is optional
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            isFloat: true, // Ensure the price is a float
            min: 0, // Price should be at least 0
        },
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: true, // Ensure quantity is an integer
            min: 0, // Quantity should be at least 0
        },
    },
    category: {
        type: DataTypes.STRING,
        allowNull: true, // Category is optional
    },
    createdBy: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'userSchemas',
            key: 'id'
        },
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }
}, {
    timestamps: true,
});

productSchema.belongsTo(userSchema,{
    foreignKey: 'createdBy',
    as: 'creator'  
})

// Synchronize the model with the database
sequelize.sync()
    .then(() => console.log('Product table created successfully'))
    .catch(err => console.error('Error creating product table', err));

module.exports = productSchema;
