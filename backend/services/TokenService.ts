import { TokenModel } from '../models/TokenModel';

const jwt = require('jsonwebtoken');

class TokenService {
    generateTokens(payload: any) {
      const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN, { expiresIn: '30m'});
      const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN, { expiresIn: '30d'});
      return {
          accessToken,
          refreshToken
      }
}
    async saveToken(userId: string, refreshToken: string) {
        const tokenData = await TokenModel.findOne({user: userId})
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
        const token = await TokenModel.create({user: userId});
        return token;
    }
}

export const tokenService = new TokenService()

