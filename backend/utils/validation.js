const { validationResult, check, query } = require('express-validator');

const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);
  
  if (!validationErrors.isEmpty()) {
    const errors = validationErrors
      .array()
      .map((error) => `${error.msg}`);
    console.log('HELLO THIS RAN')
    const err = Error('Validation error');
    err.errors = errors;
    err.status = 400;
    err.title = 'Bad request.';
    next(err);
  };
  next();
};

const validateQueryParameters = [
  query('page')
    .optional()
    .isInt({min: 0})
    .withMessage('Page must be greater than or equal to 0'),
  query('size')
    .optional()
    .isInt({min: 0})
    .withMessage('Size must be greater than or equal to 0'),
  query('minLat')
    .optional()
    .isFloat({min: -400, max: 400})
    .withMessage('Minimum latitude is invalid'),
  query('maxLat')
    .optional()
    .isFloat({min: -400, max: 400})
    .withMessage('Maximum latitude is invalid'),
  query('minLng')
    .optional()
    .isFloat({min: -400, max: 400})
    .withMessage('Minimum longitude is invalid'),
  query('maxLng')
    .optional()
    .isFloat({min: -400, max: 400})
    .withMessage('Maximum longitude is invalid'),
  query('minPrice')
    .optional()
    .isFloat({min: 0})
    .withMessage('Minimum price must be greater than or equal to 0'),
  query('maxPrice')
    .optional()
    .isFloat({min: 0})
    .withMessage('Maximum price must be greater than or equal to 0'),
  handleValidationErrors
];

module.exports = {
  handleValidationErrors,
  validateQueryParameters
};