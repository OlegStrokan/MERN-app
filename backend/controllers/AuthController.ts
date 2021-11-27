import { RoleModel } from '../models/RoleModel';
import { UserModel } from '../models/UserModel';
import * as bcrypt from 'bcryptjs';

class AuthController {
  async registration(req, res) {
    try {
        const { username, password, email, fullname } = req.body
      const candidate = await UserModel.findOne({username})
      if (candidate) {
        return res.status(400).json('Пользователь с таким именем уже существует')
      }

      const hashPassword = bcrypt.hashSync(password, 7)
      const userRole = await RoleModel.findOne({ value: 'USER'})
      const user = new UserModel({ username, password: hashPassword, roles: [userRole.value], fullname, email})
     console.log(user)
       await UserModel.create(user)
      return res.json({ message: 'Пользователь успешно зарегистрирован'})
    } catch (e) {
      console.log(e)
      res.status(400).json({message: 'Registration error'})
    }
  }

  async login (req, res) {
    try {
        const { username, password } = req.body;
        const user = await UserModel.findOne({username})
        if (!user) {
          return res.status(400).json({message: 'Пользователь ' + username + 'не найден'})
        }
        const validPassword = bcrypt.compareSync(password, user.password)
        if (!validPassword) {
          return res.status(400).json({message: 'Введен неправильный пароль'})

        }
    } catch (e) {
      console.log(e)
      res.status(400).json({message: 'Login error'})
    }
  }

  async getUsers (req, res) {
    try {

      const userRole = new RoleModel()
      const adminRole = new RoleModel({value: 'ADMIN'})
      await userRole.save()
      await adminRole.save()
        res.json('server work')
    } catch (e) {

    }
  }
}


export const AuthCtrl = new AuthController()
