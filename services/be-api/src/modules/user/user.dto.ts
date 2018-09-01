import { IsDefined, IsEmail, IsString } from 'class-validator';

export class UserRegisterDTO {
  @IsDefined()
  @IsString()
  readonly firstName: string;

  @IsDefined()
  @IsString()
  readonly lastName: string;

  @IsDefined()
  @IsEmail()
  readonly email: string;

  @IsDefined()
  @IsString()
  readonly password: string;
}

export class UserSafeDTO {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}