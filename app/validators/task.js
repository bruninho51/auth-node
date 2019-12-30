const { check } = require('express-validator')

module.exports = [
    check('name').not().isEmpty().withMessage('name is required'),
    check('score').not().isEmpty().withMessage('score is required'),
    check('minimumAge').not().isEmpty().withMessage('minimumAge is required'),
    check('score').isInt({ min: 1 }).withMessage('score must be an integer greater than 0'),
    check('minimumAge').isInt({ min: 0 }).withMessage('minimumAge must be a nonnegative integer')
]