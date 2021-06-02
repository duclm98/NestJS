import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Param,
  UsePipes,
  UseGuards,
  SetMetadata,
  UseInterceptors,
} from '@nestjs/common';

import { ForbiddenException } from '../../exceptions/fobidden.exception';
import { JoiValidationPipe } from '../../pipes/joi-validation.pipe';
import { ValidationPipe } from '../../pipes/validation.pipe';
import { ParseIntPipe } from '../../pipes/parse-int.pipe';
import { RolesGuard } from '../../guards/roles.guard';
import { RolesDecorator } from '../../decorators/roles.decorator';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './cat.model';
import { LoggingInterceptor } from 'src/interceptors/logging.interceptor';

@Controller('cats')
@UseGuards(RolesGuard)
// @UseInterceptors(LoggingInterceptor)
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  // @UsePipes(new JoiValidationPipe(createCatDto))
  @RolesDecorator(['admin'])
  async create(@Body() createCatDto: CreateCatDto) {
    return await this.catsService.create(createCatDto);
  }

  @Get()
  @RolesDecorator(['user'])
  async findAll(): Promise<Cat[]> {
    try {
      return this.catsService.findAll();
    } catch (error) {
      // throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
      throw new HttpException(
        { status: HttpStatus.FORBIDDEN, error: 'This is a custom message' },
        HttpStatus.FORBIDDEN,
      );
    }
    // throw new ForbiddenException();
  }

  @Get(':id')
  @RolesDecorator(['user'])
  async findOne(
    @Param('id', new ParseIntPipe()) id) {
    return this.catsService.findOne(id);
  }
}
