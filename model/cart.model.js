const { DataTypes } = require("sequelize");
const sequelize = require("../database/connectDb");
const userSchema = require('./user.model'); // Import the User schema
const productSchema = require('./product.model'); // Import the Product schema

const cartSchema = sequelize.define('Cart', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    createdBy: {
        type: DataTypes.UUID,
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
            model: userSchema, // Use the User schema
            key: 'id'
        }
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
            model: productSchema, // Use the Product schema
            key: 'id'
        }
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1 // Quantity should be at least 1
        }
    },
}, {
    timestamps: true // Optionally add timestamps if needed
});

// Establishing the relationships
cartSchema.belongsTo(userSchema, {
    foreignKey: 'createdBy',
    as: 'creator' // Renamed to avoid collision
});

cartSchema.belongsTo(productSchema, {
    foreignKey: 'productId',
    as: 'product' // Keep this as 'product'
});

// Sync the schema
sequelize.sync()
    .then(() => console.log('Cart table created successfully'))
    .catch(err => console.error('Error creating Cart table', err));

module.exports = cartSchema;
