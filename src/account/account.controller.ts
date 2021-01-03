import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { Role } from 'src/role.decorator';
import { RoleGuard } from 'src/role.guard';
import { AccountService } from './account.service';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(
    @Body() loginDTO: LoginDTO,
    @Res({ passthrough: true }) response: Response,
  ) {
    response.cookie('key', 'value', { signed: true });
    return this.accountService.login(loginDTO);
  }

  @Post('register')
  @UseGuards(RoleGuard)
  @Role('admin')
  @HttpCode(HttpStatus.CREATED)
  register(@Body() registerDTO: RegisterDTO) {
    return this.accountService.register(registerDTO);
  }
}
