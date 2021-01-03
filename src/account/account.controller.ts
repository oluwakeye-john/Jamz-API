import { Body, Controller, Get, Post } from '@nestjs/common';
import { responseHandler } from 'src/response';
import { AccountService } from './account.service';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get()
  test() {
    return 'hello';
  }

  @Post('login')
  async login(@Body() loginDTO: LoginDTO) {
    return responseHandler(await this.accountService.login(loginDTO));
  }

  @Post('register')
  async register(@Body() registerDTO: RegisterDTO) {
    return responseHandler(await this.accountService.register(registerDTO));
  }
}
