const { Sequelize, DataTypes } = require('sequelize');
const dbConfig = require('../config/db');

const sequelize = new Sequelize(dbConfig.DATABASE, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    logging: false,
    dialectOptions: { connectTimeout: 15000 },
    pool: {
        max: 10,
        min: 0,
        acquire: 120000,
        idle: 120000,
        evict: 120000,
    },
});

const sql = Object.create(null);

sql.sequelize = sequelize;
sql.Sequelize = Sequelize;
sql.types = DataTypes;

module.exports = sql;
