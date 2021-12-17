import { UserModel } from '../models/UserModel';
import * as bcrypt from 'bcryptjs';
import { RoleModel } from '../models/RoleModel';
const uuid = require('uuid');
import { tokenService } from './TokenService';
const mailService = require('./MailService');
const UserDto = require('../dtos/user.dto');
const ApiError = require('../exceptions/api-error');

class AuthService {
  async registration(username: string, password: string, email: string, fullname: string) {
    const candidate = await UserModel.findOne({ username })
    if (candidate) {
      throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует`);
    }
    const hashPassword = bcrypt.hashSync(password, 7)
    const userRole = await RoleModel.findOne({ value: 'USER' })
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
    await mailService.sendActivationMain(email,`${process.env.API_URL}/auth/activate/${activationLink}`);
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto })
    // сохраняем refreshToken в базу данных
    await tokenService.saveToken(userDto.id, tokens.refreshToken)

    return { ...tokens, user: userDto }

  }
  async activate(activationLink: string) {
    const user = await UserModel.findOne({activationLink})
    if (!user) {
     throw ApiError.BadRequest('Некорректная ссылка активации')
    }
    user.isActivated = true;
    await user.save();
}
}

export const authService = new AuthService();

