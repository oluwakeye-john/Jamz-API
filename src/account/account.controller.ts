import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { AccessToken } from 'src/main.interface';
import { ResponseInterceptor } from 'src/response.interceptor';
import { AccountService } from './account.service';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';

@Controller('account')
@UseInterceptors(ResponseInterceptor)
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('login')
  async login(@Body() loginDTO: LoginDTO) {
    const resp = await this.accountService.login(loginDTO);
    return resp;
  }

  @Post('register')
  async register(
    @Body() registerDTO: RegisterDTO,
    @Res({ passthrough: true }) response: Response,
  ) {
    const resp = await this.accountService.register(registerDTO);
    response.cookie(AccessToken, '');
    return resp;
  }
}
