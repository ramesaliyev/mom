export class catDto {
  readonly name: string;
  readonly age: number;
  readonly breed: string;
}

import { IsDefined, IsString, IsInt } from 'class-validator';

export class CreateCatDto {
  @IsString() readonly name: string;

  @IsInt() readonly age: number;

  @IsString()
  @IsDefined()
  readonly breed: string;

  oha(): string {
    return 'kamilleeee';
  }
}
