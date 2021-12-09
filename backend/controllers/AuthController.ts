import { RoleModel } from '../models/RoleModel';
import { UserModel, UserModelInterface } from '../models/UserModel';
import * as bcrypt from 'bcryptjs';
import * as express from 'express';
import { isValidObjectId } from '../utils/isValidObjectId';
import { validationResult } from 'express-validator';

const jwt = require('jsonwebtoken');
const { secret } = require('../config')

const generateAccessToken = (id, roles) => {
  const payload = {
    id,
    roles
  }
  return jwt.sign(payload, secret, { expiresIn: '24h' })
}

class AuthController {
  async registration(req, res) {
    try {
      const { username, password, email, fullname } = req.body.data

      const candidate = await UserModel.findOne({ username })
      if (candidate) {
        return res.status(400).json('Пользователь с таким именем уже существует')
      }
      const hashPassword = bcrypt.hashSync(password, 7)
      const userRole = await RoleModel.findOne({ value: 'USER' })
      const user = new UserModel({ username, password: hashPassword, roles: [userRole.value], fullname, email })
      await UserModel.create(user)
      return res.json({ message: 'Пользователь успешно зарегистрирован' })
    } catch (e) {
      res.status(400).json({ message: 'Registration error' })
    }
  }

  async login(req, res) {
    try {
      const { username, password } = req.body.data;
      const user = await UserModel.findOne({ username })
      if (!user) {
        return res.json({ message: 'Пользователь ' + username + ' не найден', resultCode: 1 })
      }
      const validPassword = bcrypt.compareSync(password, user.password)
      if (!validPassword) {
        return res.json({ message: 'Введен неправильный пароль', resultCode: 1 })

      }
      const token = generateAccessToken(user._id, user.roles);
      return res.json({ token, user, resultCode: 0 })
    } catch (e) {
      res.status(400).json({ message: 'Login error' })
    }
  }

  async logout(req: express.Request, res: express.Response): Promise<void> {
    try {
      res.cookie('token', '');
      res.status(200).json({
        status: 'success',
        message: 'Logout success'
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error,
      });
    }

  }

  async update(req: express.Request, res: express.Response): Promise<void> {
    const userId = req.body._id;
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        res.status(400).json({ status: 'error', errors: errors.array() });
        return;
      }
      if (userId) {
        if (!isValidObjectId(userId)) {
          res.status(400).send();
          return;
        }

        const currentUser = await UserModel.findById(userId);

        if (userId) {
          if (String(currentUser._id) === String(userId)) {
            currentUser.email = req.body.email;
            currentUser.fullname = req.body.fullname;
            currentUser.username = req.body.username;
            currentUser.save();
            res.status(200).json({
              data: currentUser,
              message: 'success'
            })
          } else {
            res.status(403).send();
          }
        } else {
          res.status(404).send();
        }
      }
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error,
      });
    }
  }


}


export const AuthCtrl = new AuthController()
