const validators = require('../validators');

module.exports = (validator) => {
    // eslint-disable-next-line no-prototype-builtins
    if (!validators.hasOwnProperty(validator)) { throw new Error(`'${validator}' validator is not exist`); }

    // eslint-disable-next-line consistent-return,func-names
    return async (req, res, next) => {
        try {
            req.body = await validators[validator].validateAsync(req.body, { abortEarly: false });
            next();
        } catch (err) {
            if (err.isJoi) {
                return res.status(400).json({
                    errors: err.details.map((e) => e.message),
                    msg: '',
                });
            }
            return res.status(500).json({
                errors: [err],
                msg: '',
            });
        }
    };
};
