import * as express from 'express';

const ApiError = require('../exceptions/api-error');

module.exports = function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
  if (err instanceof  ApiError) {
    return res.status(err.status).json({ message: err.message, errors: err })
  }
  return res.status(500).json({ message: 'Непредвиденная ошибка'})
}
