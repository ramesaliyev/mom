import { Injectable } from '@nestjs/common';
import { CreateCatDto } from './cat.dto';

@Injectable()
export class CatsService {
  private readonly cats: CreateCatDto[] = [];

  create(cat: CreateCatDto) {
    this.cats.push(cat);
  }

  findAll(): CreateCatDto[] {
    return this.cats;
  }
}
