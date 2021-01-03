import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { CustomReq } from './main.interface';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: CustomReq, res: any, next: () => void) {
    const accessToken = req.signedCookies?.['access-token'];
    if (accessToken) {
      req.user = accessToken;
      next();
    } else {
      req.user = false;
      throw new UnauthorizedException();
    }
  }
}
