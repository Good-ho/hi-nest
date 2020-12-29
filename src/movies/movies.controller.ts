import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { identity } from 'rxjs';

@Controller('movies')
export class MoviesController {
  @Get()
  getAll() {
    return 'This will return all movies';
  }

  @Get('/search')
  search(@Query('year') year: string) {
    return `We are searching a movie made after ${year}`;
  }

  @Get('/:id')
  getOne(@Param('id') id: string) {
    return `This will return one movie with the ${id}`;
  }

  @Post()
  create(@Body() movieData) {
    console.log(movieData);
    return 'This will create a movie';
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return `This will delete a movie with the id : ${id}`;
  }

  @Patch('/:id')
  patch(@Param('id') id: string, @Body() updateDate) {
    return {
      updateMovie: id,
      ...updateDate,
    };
  }
}
