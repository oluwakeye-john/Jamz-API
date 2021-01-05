import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  AccessToken,
  AccessTokenMaxAge,
  RefreshToken,
  RefreshTokenMaxAge,
} from './main.interface';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response: Response = context.switchToHttp().getResponse();

    return next.handle().pipe(
      map((_data) => {
        const data = _data || {};
        if (typeof data === 'object') {
          const { tokens, ...payload } = data;
          if (tokens) {
            const accessToken = data?.tokens?.[AccessToken];
            const refreshToken = data?.tokens?.[RefreshToken];
            if (accessToken) {
              response.cookie(AccessToken, accessToken, {
                signed: true,
                maxAge: AccessTokenMaxAge,
              });
            }
            if (refreshToken) {
              response.cookie(RefreshToken, refreshToken, {
                signed: true,
                maxAge: RefreshTokenMaxAge,
              });
            }
          }
          return payload;
        } else {
          return { message: data };
        }
      }),
    );
  }
}
