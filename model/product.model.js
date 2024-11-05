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
            notEmpty: true, 
        },
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true, 
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            isFloat: true, 
            min: 0, 
        },
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: true, 
            min: 0, 
        },
    },
    category: {
        type: DataTypes.STRING,
        allowNull: true, 
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


sequelize.sync()
    .then(() => console.log('Product table created successfully'))
    .catch(err => console.error('Error creating product table', err));

module.exports = productSchema;
