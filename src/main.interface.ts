import { Request } from 'express';

export type CustomReq = Request & { user: string | false };
