import { Injectable, NestMiddleware } from '@nestjs/common';
import { AccessToken, CustomReq } from './main.interface';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: CustomReq, res: any, next: () => void) {
    const accessToken = req.signedCookies?.[AccessToken];
    if (accessToken) {
      req.user = accessToken;
    } else {
      req.user = false;
      // throw new UnauthorizedException();
    }
    next();
  }
}
