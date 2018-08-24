import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform<string, number> {
  transform(value: string, metadata: ArgumentMetadata): number {
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      console.log('parseint patlayanzi');
      throw new BadRequestException('Validation failed');
    }
    return val;
  }
}
