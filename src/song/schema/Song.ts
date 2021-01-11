import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Song extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({
    default:
      'https://res.cloudinary.com/johnprops/image/upload/v1610365743/album-placeholder_gblrxp.png',
  })
  imageUrl: string;

  @Prop({ required: true })
  fileUrl: string;

  @Prop({ default: '' })
  albumId: string;

  @Prop({ default: '' })
  artistId: string;

  @Prop({ default: '' })
  genreId: string;

  @Prop({ default: false })
  hidden: boolean;
}

export const SongSchema = SchemaFactory.createForClass(Song);
