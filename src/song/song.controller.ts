import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseInterceptors,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { SongService } from './song.service';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { ResponseInterceptor } from 'src/response.interceptor';

@Controller('song')
@UseInterceptors(ResponseInterceptor)
export class SongController {
  constructor(private readonly songService: SongService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createSongDto: CreateSongDto) {
    return this.songService.create(createSongDto);
  }

  @Get()
  findAll() {
    return this.songService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.songService.findById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateSongDto: UpdateSongDto) {
    return this.songService.update(id, updateSongDto);
  }

  @Get('search/:q')
  search() {
    return [];
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.songService.remove(id);
  }
}
