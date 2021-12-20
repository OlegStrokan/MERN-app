import * as validator from "express-validator"

export const loginValidation = [
  validator.body('email', 'Enter your email').isEmail().withMessage('Incorrect email').isLength({
    min: 10,
    max: 40,
  }).withMessage('Email name must be longer then 10 symbols and smaller then 40 symbols '),
  validator
    .body('password', 'Enter your password')
    .isString()
    .isLength({
      min: 6
    }).withMessage('Password must be longer than 6 symbols')
]
