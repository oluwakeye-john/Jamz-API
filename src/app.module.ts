import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from './config';
import { configValidation } from './config/validation';
import { AccountModule } from './account/account.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountController } from './account/account.controller';
import { AuthMiddleware } from './auth.middleware';
import { SongModule } from './song/song.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      cache: true,
      validationSchema: configValidation,
      validationOptions: {
        abortEarly: true,
        allowUnknown: true,
      },
    }),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    AccountModule,
    SongModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'account/login', method: RequestMethod.POST },
        { path: 'account/register', method: RequestMethod.POST },
      )
      .forRoutes(AccountController);
  }
}
