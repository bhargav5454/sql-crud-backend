const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('SQL-CRUD', 'postgres', 'root1', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false,  
})

sequelize
    .authenticate()
    .then(() => console.log('Connection has been established successfully.'))
    .catch((err) => console.error('Unable to connect to the database:', err))

module.exports = sequelize