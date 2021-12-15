import { UserModel } from '../models/UserModel';
import * as bcrypt from 'bcryptjs';
import { RoleModel } from '../models/RoleModel';
import uuid from 'uuid';
import { mailService } from './MailService';
import { tokenService } from './TokenService';
const UserDto = require('../dtos/user.dto');

class AuthService {
  async registration(username: string, password: string, email: string, fullname: string) {
    const candidate = await UserModel.findOne({ username })
    if (candidate) {
      throw new Error('Пользователь с таким именем уже существует')
    }
    const hashPassword = bcrypt.hashSync(password, 7)
    const userRole = await RoleModel.findOne({ value: 'USER' })
    console.log(userRole)
    // ссылка для активации аккаунта
    const activationLink = uuid.v4();
    console.log(activationLink)
    const user = await UserModel.create({
      username,
      password: hashPassword,
      roles: [userRole.value],
      fullname,
      email,
      activationLink
    })
    console.log(user);
    // посылаем ссылку активации на email
    await mailService.sendActivationMain(email,`${process.env.API_URL}/api/activate/${activationLink}`);
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto })
    // сохраняем refreshToken в базу данных
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
      message: 'Пользователь успешно зарегистрирован'
    }

  }
}

export const authService = new AuthService();

