import { UserModel } from '../models/UserModel';
import * as bcrypt from 'bcryptjs';

const uuid = require('uuid');
import { tokenService } from './TokenService';

const mailService = require('./MailService');
const UserDto = require('../dtos/user.dto');
const ApiError = require('../exceptions/api-error');

class AuthService {
  async registration(username: string, password: string, email: string, fullname: string) {
    const candidate = await UserModel.findOne({ email })
    if (candidate) {
      throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует`);
    }
    const hashPassword = bcrypt.hashSync(password, 7)
    // ссылка для активации аккаунта
    const activationLink = uuid.v4();
    const user = await UserModel.create({
      email: email,
      fullname: fullname,
      username: username,
      password: hashPassword,
      activationLink: activationLink,
      isActivated: false,
      role: 'USER',
      posts: [],
    })
    // посылаем ссылку активации на email
    await mailService.sendActivationMain(email, `${process.env.API_URL}/auth/activate/${activationLink}`);
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto })
    // сохраняем refreshToken в базу данных
    await tokenService.saveToken(userDto.id, tokens.refreshToken)

    return { ...tokens, user: userDto }

  }

  async activate(activationLink: string) {
    const user = await UserModel.findOne({ activationLink })
    if (!user) {
      throw ApiError.BadRequest('Некорректная ссылка активации')
    }
    user.isActivated = true;
    await user.save();
  }

  async login(email: string, password: string) {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw ApiError.BadRequest('Пользователь с таким email не найден')
    }
    const validPassword = bcrypt.compareSync(password, user.password)
    if (!validPassword) {
      throw ApiError.BadRequest('Неверный пароль')
    }
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto })
    await tokenService.saveToken(userDto.id, tokens.refreshToken)

    return { ...tokens, user: userDto }
  }

  async logout(refreshToken: string) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb ) {
      throw ApiError.UnauthorizedError();
    }

    // @ts-ignore
    const user = await UserModel.findById(userData.id)
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto })
    await tokenService.saveToken(userDto.id, tokens.refreshToken)
    return {...tokens, user: userDto}


  }
}

export const authService = new AuthService();

