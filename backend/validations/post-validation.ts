import * as validator from 'express-validator';

export const postValidation = [
  validator.body('title', 'Enter your post\'s title')
    .isLength({
      min: 20,
      max: 400,
    }).withMessage('Title must be longer then 10 symbols and smaller then 30 symbols '),
  validator.body('content', 'Enter your post\'s message')
    .isLength({
    min: 20,
    max: 400,
  }).withMessage('Content must be longer then 20 symbols and smaller then 400 symbols ')
]
