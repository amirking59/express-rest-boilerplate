const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: process.env.dialect,
    logging: false,
    dialectOptions: { connectTimeout: 15000 },
});

const sql = Object.create(null);

sql.sequelize = sequelize;
sql.Sequelize = Sequelize;
sql.types = DataTypes;

module.exports = sql;
