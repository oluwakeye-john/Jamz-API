import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import origins from './config/origin';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin:
      configService.get('PORT') === 'production' ? origins.prod : origins.dev,
  });
  await app.listen(configService.get('PORT'));
}
bootstrap();
