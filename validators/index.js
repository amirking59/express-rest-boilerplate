const user = require('./user.validator');

module.exports = {
    userRegister: user.userRegister,
    userLogin: user.userLogin,
};
