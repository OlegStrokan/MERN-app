import * as validator from 'express-validator';

export const userValidations = [
  validator.body('email', 'Enter your email').isEmail().withMessage('Incorrect email').isLength({
    min: 10,
    max: 40,
  }).withMessage('Email name must be longer then 10 symbols and smaller then 40 symbols '),
  validator
    .body('fullname', 'Enter your full name')
    .isString()
    .isLength({
      min: 2,
      max: 40,
    }).withMessage('Full name must be longer then 2 symbols and smaller then 40 symbols '),
  validator
    .body('username', 'Enter your user name')
    .isString()
    .isLength({
      min: 2,
      max: 40,
    }).withMessage('User name must be longer then 2 symbols and smaller then 40 symbols '),
]
