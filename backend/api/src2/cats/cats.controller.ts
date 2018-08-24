import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  UsePipes,
  ValidationPipe,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateCatDto } from './cat.dto';
import { catSchema } from './cat.schema';
import { CatsService } from './cats.service';
import { JoiValidationPipe } from '../pipes/joi.pipe';
// import { ValidationPipe } from '../pipes/validation.pipe';
import { ParseIntPipe } from '../pipes/parseint.pipe';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { CacheInterceptor } from '../interceptors/cache.interceptor';

@Controller('cats')
@UseGuards(RolesGuard)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  @UsePipes(
    new ValidationPipe({
      transform: true,
      skipMissingProperties: true,
      whitelist: true,
    }),
  ) // official
  // @UsePipes(ValidationPipe) Our
  // @UsePipes(new JoiValidationPipe(catSchema))
  async create(@Body() createCatDto: CreateCatDto) {
    if (!createCatDto.name) {
      throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST);
    }

    this.catsService.create(createCatDto);

    return {
      oba: createCatDto.oha(),
      success: true,
      data: createCatDto,
      type: typeof createCatDto,
    };
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  async findAll(): Promise<CreateCatDto[]> {
    console.log('mecalledd');
    return this.catsService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe)
    id,
  ) {
    return `This action returns a #${id} cat`;
  }

  @Put(':id')
  update(@Param('id') id, @Body() CreateCatDto: CreateCatDto) {
    console.log(CreateCatDto);
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id) {
    if (Math.random() < 0.1) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'This is a custom message',
        },
        403,
      );
    }

    return `This action removes a #${id} cat`;
  }
}
