import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from './config';

@Module({
  imports: [ConfigModule.forRoot({ load: [config] })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
