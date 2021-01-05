import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
  UseInterceptors,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResponseInterceptor } from 'src/response.interceptor';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistErrors } from './error-messages';
import { Artist } from './schema/Artist';

@Injectable()
@UseInterceptors(ResponseInterceptor)
export class ArtistService {
  constructor(
    @InjectModel(Artist.name) private readonly artist: Model<Artist>,
  ) {}
  private readonly logger = new Logger(ArtistService.name);

  async create(createArtistDto: CreateArtistDto) {
    try {
      const newArtist = new this.artist(createArtistDto);
      await newArtist.save();
      return 'Artist created';
    } catch (err) {
      this.logger.error(err);
      throw new BadRequestException(ArtistErrors.ERROR_CREATING_ARTIST);
    }
  }

  async findAll() {
    try {
      return await this.artist.find();
    } catch (err) {
      this.logger.error(err);
      throw new NotFoundException(ArtistErrors.ERROR_FETCHING_ARTIST);
    }
  }

  async findOne(id: string) {
    try {
      const resp = await this.artist.findById(id).lean();
      if (!resp?._id) {
        throw new BadRequestException(ArtistErrors.ERROR_FETCHING_ARTIST);
      }
      return resp;
    } catch (err) {
      this.logger.error(err);
      throw new NotFoundException(ArtistErrors.ERROR_FETCHING_ARTIST);
    }
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    try {
      await this.artist.findByIdAndUpdate(id, updateArtistDto, {
        new: true,
      });
      return 'Artist updated';
    } catch (err) {
      this.logger.error(err);
      throw new BadRequestException(ArtistErrors.ERROR_UPDATING_ARTIST);
    }
  }

  async remove(id: string) {
    try {
      await this.artist.findByIdAndDelete(id);
      return 'Artist deleted';
    } catch (err) {
      this.logger.error(err);
      throw new BadRequestException(ArtistErrors.ERROR_DELETING_ARTIST);
    }
  }
}
