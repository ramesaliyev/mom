import { IsDefined, IsString, IsNotEmpty } from 'class-validator';

export class JobCreateDTO {
  @IsDefined()
  @IsString()
  readonly type: string;

  @IsDefined()
  @IsNotEmpty()
  readonly details: object;
}