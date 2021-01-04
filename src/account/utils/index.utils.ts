import * as bcrypt from 'bcrypt';
import { UserRole } from '../interfaces/user.interface';
import * as jwt from 'jsonwebtoken';
import config from 'src/config';

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

export const comparePassword = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};

export const generateAccessToken = (
  id: string,
  role: UserRole = UserRole.REGULAR,
) => {
  return jwt.sign({ id, role }, config().keys.ACCESS_KEY, {
    expiresIn: 60 * 60 * 5,
  });
};

export const generateRefreshToken = (id: string) => {
  return jwt.sign({ id }, config().keys.REFRESH_KEY, { expiresIn: '30d' });
};

export const verifyJWT = (token: string, key: string): any | boolean => {
  try {
    const resp: any = jwt.verify(token, key);
    return resp;
  } catch {
    return false;
  }
};

export const verifyAccessToken = (token: string) => {
  const resp = verifyJWT(token, config().keys.ACCESS_KEY);
  if (resp) {
    return resp;
  }
  return false;
};

export const verifyRefreshToken = (token: string) => {
  const resp = verifyJWT(token, config().keys.REFRESH_KEY);
  if (resp) {
    return resp;
  }
  return false;
};
