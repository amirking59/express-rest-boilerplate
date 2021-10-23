const { Sequelize, DataTypes } = require('sequelize');

const config = require('../config/config.json')[process.env.NODE_ENV || 'development'];

const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.types = DataTypes;
db.User = require('./user')(sequelize, Sequelize, DataTypes);

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

module.exports = db;
