import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResponseHandler } from 'src/response';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import { User, UserDocument } from './schemas/User.schema';
import { comparePassword, hashPassword } from './utils/index.utils';

@Injectable()
export class AccountService {
  constructor(@InjectModel(User.name) private user: Model<UserDocument>) {}
  private readonly logger = new Logger(AccountService.name);

  async login(data: LoginDTO): Promise<ResponseHandler> {
    const user = await this.user
      .findOne({ email: data.email })
      .select(['password']);

    if (user && user._id) {
      const isPasswordValid = await comparePassword(
        data.password,
        user.password,
      );

      if (isPasswordValid) {
        return { msg: 'Login Successful', data: {} };
      }
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async register(data: RegisterDTO): Promise<ResponseHandler> {
    try {
      const hashed = await hashPassword(data.password);
      const newUser = new this.user({ ...data, password: hashed });
      await newUser.save();
      return { msg: 'Account created' };
    } catch (err) {
      if (11000 === err.code || 11001 === err.code) {
        throw new ConflictException('Account already exist');
      } else {
        throw new BadRequestException('An error occurred');
      }
    }
  }

  async me(id: string) {
    return await this.user.findOne({ _id: id });
  }
}
