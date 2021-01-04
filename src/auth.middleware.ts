import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { verifyAccessToken } from './account/utils/index.utils';
import { AccessToken, CustomReq } from './main.interface';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: CustomReq, res: any, next: () => void) {
    const accessToken = req.signedCookies?.[AccessToken];
    if (accessToken) {
      const token: any = verifyAccessToken(accessToken);
      req.user = token.id;
      next();
    } else {
      req.user = false;
    }
    throw new UnauthorizedException();
  }
}
