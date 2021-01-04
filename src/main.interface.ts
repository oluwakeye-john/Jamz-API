import { Request } from 'express';
export const AccessToken = 'access-token';
export const RefreshToken = 'refresh-token';

export type CustomReq = Request & { user: string | false };
