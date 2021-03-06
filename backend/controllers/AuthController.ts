import { UserModel } from '../models/UserModel';
import * as express from 'express';
import { isValidObjectId } from '../utils/isValidObjectId';
import { validationResult } from 'express-validator';
import { authService } from '../services/AuthService';

const ApiError = require('../exceptions/api-error')

class AuthController {
  async registration(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
        message: 'Ошибка при валидации', errors: errors.array()
      });
      }
      const { username, password, email, fullname } = req.body
      const userData = await authService.registration(username, password, email, fullname);
      // вписываем куку - истекает за 30 дней, httpOnly - нельзя увидеть и изменить с браузера
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })

      return res.json({
        message: 'Регистрация прошла успешно',
        data: userData,
      })

    } catch (e) {
      next(e)
    }
  }

  async login(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Ошибка при валидации', errors.array()));
      }
      const { email, password } = req.body;
      const userData = await authService.login(email, password);
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async logout(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      const token = await authService.logout(refreshToken)
      res.clearCookie('refreshToken');
      return res.json(token);
    } catch (e) {
      next(e)
    }

  }

  async activate(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    try {
      const activationLink = req.params.link;
      await authService.activate(activationLink);
      return res.redirect(process.env.CLIENT_URL);
    } catch (e) {
      next(e)
    }
  }

  async refresh(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await authService.refresh(refreshToken);
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
      return res.json(userData);
    } catch (e) {
      next(e)
    }
  }
}


export const AuthCtrl = new AuthController()
