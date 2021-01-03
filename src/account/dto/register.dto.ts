import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class RegisterDTO {
  @IsNotEmpty()
  @Length(2)
  readonly name: string;

  @IsEmail()
  readonly email: string;

  @Length(6)
  readonly password: string;
}
