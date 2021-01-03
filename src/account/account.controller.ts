import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AccountService } from './account.service';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('login')
  @HttpCode(200)
  login(@Body() loginDTO: LoginDTO) {
    return this.accountService.login(loginDTO);
  }

  @Post('register')
  @HttpCode(201)
  register(@Body() registerDTO: RegisterDTO) {
    return this.accountService.register(registerDTO);
  }
}
