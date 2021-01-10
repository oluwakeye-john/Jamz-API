import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Artist extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({
    default:
      'https://res.cloudinary.com/johnprops/image/upload/v1605560906/placeholder_wt9snh.png',
  })
  imageUrl?: string;

  @Prop({ default: '' })
  description: string;
}

export const ArtistSchema = SchemaFactory.createForClass(Artist);
