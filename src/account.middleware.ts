import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class AccountMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    console.log('cookies', req.signedCookies);
    next();
  }
}
