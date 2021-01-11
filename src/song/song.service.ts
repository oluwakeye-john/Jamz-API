import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
  UseInterceptors,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Artist } from 'src/artist/schema/Artist';
import { ResponseInterceptor } from 'src/response.interceptor';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { SongErrors } from './error-messages';
import { Song } from './schema/Song';

@Injectable()
@UseInterceptors(ResponseInterceptor)
export class SongService {
  constructor(
    @InjectModel(Song.name) private readonly song: Model<Song>,
    @InjectModel(Artist.name) private readonly artist: Model<Artist>,
  ) {}

  private readonly logger = new Logger(SongService.name);

  async create(createSongDto: CreateSongDto) {
    try {
      const newSong = new this.song(createSongDto);
      await newSong.save();
      return 'Song created';
    } catch (err) {
      this.logger.error(err);
      throw new BadRequestException(SongErrors.ERROR_CREATING_SONG);
    }
  }

  async findAll() {
    try {
      return await this.song.find().sort('-createdAt');
    } catch (err) {
      console.log(err);
      this.logger.error(err);
      throw new NotFoundException(SongErrors.ERROR_FETCHING_SONG);
    }
  }

  async search(q: string): Promise<Song[]> {
    try {
      return await this.song.find({ name: { $regex: q, $options: 'i' } });
    } catch (err) {
      this.logger.error(err);
      throw new NotFoundException(SongErrors.ERROR_FETCHING_SONG);
    }
  }

  async findById(id: string): Promise<any> {
    try {
      const resp = await this.song.findById(id).lean();
      if (!resp?._id) {
        throw new BadRequestException(SongErrors.ERROR_FETCHING_SONG);
      }
      return resp;
    } catch (err) {
      this.logger.error(err);
      throw new NotFoundException(SongErrors.ERROR_FETCHING_SONG);
    }
  }

  async update(id: string, updateSongDto: UpdateSongDto) {
    try {
      await this.song.findByIdAndUpdate(id, updateSongDto, {
        new: true,
      });
      return 'Song updated';
    } catch (err) {
      this.logger.error(err);
      throw new BadRequestException(SongErrors.ERROR_UPDATING_SONG);
    }
  }

  async remove(id: string) {
    try {
      await this.song.findByIdAndDelete(id);
      return 'Song deleted';
    } catch (err) {
      this.logger.error(err);
      throw new BadRequestException(SongErrors.ERROR_DELETING_SONG);
    }
  }
}
