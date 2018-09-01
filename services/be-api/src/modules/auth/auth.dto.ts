import { IsDefined, IsEmail, IsString } from 'class-validator';

export class LoginDTO {
  @IsDefined()
  @IsEmail()
  readonly email: string;

  @IsDefined()
  @IsString()
  readonly password: string;
}