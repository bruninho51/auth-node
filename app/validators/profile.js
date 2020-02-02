const { check } = require('express-validator');

module.exports = [
    check('nickname').not().isEmpty().withMessage('nickname is required'),
    check('pwd').not().isEmpty().withMessage('pwd is required'),
    check('dateOfBird').not().isEmpty().withMessage('dateOfBird is required'),
    check('dateOfBird').custom(value => {
        if (!value.match(/^\d{4}-\d{2}-\d{2}$/)) return false;
        const date = new Date(value);
        if (!date.getTime()) return false;
        return date.toISOString().slice(0, 10) === value;
    }).withMessage('dateOfBird must be valid'),
    check('score').not().isEmpty().withMessage('score is required'),
    check('score').isInt().withMessage('score must be integer value')
];