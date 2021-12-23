import * as validator from 'express-validator';

export const postValidation = [
  validator.body('content', 'Enter your post\'s message')
    .isLength({
    min: 20,
    max: 400,
  }).withMessage('Post must be longer then 20 symbols and smaller then 400 symbols ')
]
