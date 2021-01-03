import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from './config';
import { configValidation } from './config/validation';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
