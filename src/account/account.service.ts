import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import { User, UserDocument } from './schemas/User.schema';

@Injectable()
export class AccountService {
  constructor(@InjectModel(User.name) private user: Model<UserDocument>) {}
  private readonly logger = new Logger(AccountService.name);

  login(data: LoginDTO) {
    this.logger.log(data);
    return {};
  }

  register(data: RegisterDTO) {
    this.logger.log(data);
    return 'Account created';
  }
}
