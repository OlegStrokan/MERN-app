// @ts-ignore
import express from 'express';
import { tokenService } from '../services/TokenService';
const ApiError = require('../exceptions/api-error');

module.exports = function (req: express.Request, res: express.Response, next: express.NextFunction) {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return next(ApiError.UnauthorizedError());
    }
    const accessToken = authorizationHeader.split(' ')[1];
    if (!accessToken) {
      return next(ApiError.UnauthorizedError());
    }

    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) {
      return  next(ApiError.UnauthorizedError());
    }
  //@ts-ignore
    req.user = userData;
    next();
  } catch(e) {
      return next(ApiError.UnauthorizedError())
  }
}
