const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database/connectDb');

const userSchema = sequelize.define('userSchema', {
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4, 
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    timestamps: false
});

sequelize.sync().then(() => console.log('user table created successfully'))
    .catch(err => console.error('Error creating user table', err));

module.exports = userSchema;
