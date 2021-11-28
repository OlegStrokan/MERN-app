import { RoleModel } from '../models/RoleModel';
import { UserModel } from '../models/UserModel';
import * as bcrypt from 'bcryptjs';
const jwt = require('jsonwebtoken');
const { secret } = require('../config')

const generateAccessToken = (id, roles) => {
    const payload  = {
      id,
      roles
    }
    return jwt.sign(payload, secret, {expiresIn: '24h'})
}

class AuthController {
  async registration(req, res) {
    try {
      const { username, password, email, fullname } = req.body
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
      const { username, password } = req.body;
      const user = await UserModel.findOne({ username })
      if (!user) {
        return res.status(400).json({ message: 'Пользователь ' + username + 'не найден' })
      }
      const validPassword = bcrypt.compareSync(password, user.password)
      if (!validPassword) {
        return res.status(400).json({ message: 'Введен неправильный пароль' })

      }
      const token = generateAccessToken(user._id, user.roles);
      return res.json({ token })
    } catch (e) {
      console.log(e)
      res.status(400).json({ message: 'Login error' })
    }
  }
}


export const AuthCtrl = new AuthController()
