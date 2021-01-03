import {
  ConflictException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';

@Injectable()
export class AccountService {
  private readonly logger = new Logger(AccountService.name);

  private users = [
    { email: 'oluwakeye@gmail.com' },
    { email: 'payload@gmail.com' },
  ];

  login(data: LoginDTO) {
    const user = this.users.find((user) => user.email === data.email);
    if (user) {
      return user;
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  register(data: RegisterDTO) {
    const user = this.users.find((user) => user.email === data.email);
    if (user) {
      throw new ConflictException('User already exist');
    }
    this.users.push(data);
    return 'Account created';
  }
}
