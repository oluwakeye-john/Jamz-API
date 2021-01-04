import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { CustomReq } from 'src/main.interface';
import { ResponseInterceptor } from 'src/response.interceptor';
import { AccountService } from './account.service';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';

@Controller('account')
@UseInterceptors(ResponseInterceptor)
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDTO: LoginDTO) {
    const data = await this.accountService.login(loginDTO);
    return data;
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerDTO: RegisterDTO) {
    const data = await this.accountService.register(registerDTO);
    return data;
  }

  @Get('me')
  @HttpCode(HttpStatus.OK)
  async me(@Req() request: CustomReq) {
    const data = await this.accountService.me(request.user);
    return data;
  }
}
