import { Request } from 'express';
export const AccessToken = 'access-token';
export const RefreshToken = 'refresh-token';

export const AccessTokenMaxAge = 60 * 5 * 1000;
export const RefreshTokenMaxAge = 60 * 60 * 24 * 30 * 1000;

export type CustomReq = Request & { user: string };
