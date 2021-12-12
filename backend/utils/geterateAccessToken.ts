const jwt = require('jsonwebtoken');
const { secret } = require('../config')

export const generateAccessToken = (id: any, roles: any) => {
  const payload = {
    id,
    roles
  }
  return jwt.sign(payload, secret, { expiresIn: '24h' })
}
