import { Module } from '@nestjs/common';
import { SongService } from './song.service';
import { SongController } from './song.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Song, SongSchema } from './schema/Song';
import { Artist, ArtistSchema } from 'src/artist/schema/Artist';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Song.name, schema: SongSchema },
      { name: Artist.name, schema: ArtistSchema },
    ]),
  ],
  controllers: [SongController],
  providers: [SongService],
})
export class SongModule {}
