import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AccessToken, RefreshToken } from 'src/main.interface';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import { User } from './schemas/User.schema';
import {
  comparePassword,
  generateAccessToken,
  generateRefreshToken,
  hashPassword,
} from './utils/index.utils';

export interface AuthResponse {
  tokens: {
    [AccessToken]: string;
    [RefreshToken]: string;
  };
  message?: string;
}
@Injectable()
export class AccountService {
  constructor(@InjectModel(User.name) private user: Model<User>) {}
  private readonly logger = new Logger(AccountService.name);

  async login(data: LoginDTO): Promise<AuthResponse> {
    const user = await this.user
      .findOne({ email: data.email })
      .select(['password']);

    if (user && user._id) {
      const isPasswordValid = await comparePassword(
        data.password,
        user.password,
      );

      if (isPasswordValid) {
        const accessToken = generateAccessToken(user._id);
        const refreshToken = generateRefreshToken(user._id);

        return {
          tokens: {
            'access-token': accessToken,
            'refresh-token': refreshToken,
          },
          message: 'Login successful',
        };
      }
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async register(data: RegisterDTO): Promise<AuthResponse> {
    try {
      const hashed = await hashPassword(data.password);
      const newUser = new this.user({ ...data, password: hashed });
      await newUser.save();

      const accessToken = generateAccessToken(newUser._id);
      const refreshToken = generateRefreshToken(newUser._id);

      return {
        tokens: {
          'access-token': accessToken,
          'refresh-token': refreshToken,
        },
        message: 'Account created',
      };
    } catch (err) {
      if (11000 === err.code || 11001 === err.code) {
        throw new ConflictException('Account already exist');
      } else {
        this.logger.error(err);
        throw new BadRequestException('An error occurred');
      }
    }
  }

  async me(id: string) {
    try {
      const user = await this.user.findOne({ _id: id }).lean();
      return user;
    } catch (err) {
      this.logger.log(err);
      throw new BadRequestException('Invalid user');
    }
  }
}
