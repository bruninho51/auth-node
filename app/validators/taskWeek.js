const { check } = require('express-validator');

module.exports = [
    check('tasks_id').not().isEmpty().withMessage('task_id is required'),
    check('tasks_id').isInt({ min: 1 }).withMessage('task_id must be a valid id'),
    check('dom').isBoolean().not().isEmpty().withMessage('dom must be type boolean'),
    check('seg').isBoolean().not().isEmpty().withMessage('seg must be type boolean'),
    check('ter').isBoolean().not().isEmpty().withMessage('ter must be type boolean'),
    check('qua').isBoolean().not().isEmpty().withMessage('qua must be type boolean'),
    check('qui').isBoolean().not().isEmpty().withMessage('qui must be type boolean'),
    check('sex').isBoolean().not().isEmpty().withMessage('sex must be type boolean'),
    check('sab').isBoolean().not().isEmpty().withMessage('sab must be type boolean')
];