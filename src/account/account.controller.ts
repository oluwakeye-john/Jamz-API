import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
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
    const data = await this.accountService.login(loginDTO);
    return data;
  }

  @Post('register')
  async register(@Body() registerDTO: RegisterDTO) {
    const data = await this.accountService.register(registerDTO);
    return data;
  }

  @Get('me')
  async me() {
    const data = await this.accountService.me('12');
    return data;
  }
}
