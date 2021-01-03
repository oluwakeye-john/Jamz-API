import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import origins from './config/origin';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.NODE_ENV === 'production' ? origins.prod : origins.dev,
  });
  await app.listen(process.env.PORT);
}
bootstrap();
