import { UserModel } from '../models/UserModel';
import * as bcrypt from 'bcryptjs';
import { RoleModel } from '../models/RoleModel';
const uuid = require('uuid');
import { tokenService } from './TokenService';
const mailService = require('./MailService');
const UserDto = require('../dtos/user.dto');

class AuthService {
  async registration(username: string, password: string, email: string, fullname: string) {
    console.log(username)
    const candidate = await UserModel.findOne({ username })
    console.log(candidate)
    if (candidate) {
      throw new Error('Пользователь с таким именем уже существует')
    }
    const hashPassword = bcrypt.hashSync(password, 7)
    console.log('user1');
    const userRole = await RoleModel.findOne({ value: 'USER' })
    console.log('user2');
    // ссылка для активации аккаунта
    const activationLink = uuid.v4();
    const user = await UserModel.create({
      email: email,
      fullname: fullname,
      username: username,
      password: hashPassword,
      activationLink: activationLink,
      isActivated: false,
      roles: [userRole.value],
      posts: [],
    })
    // посылаем ссылку активации на email
    console.log('user3')
    await mailService.sendActivationMain(email,`${process.env.API_URL}/auth/activate/${activationLink}`);
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

