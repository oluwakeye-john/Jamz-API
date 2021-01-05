import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateSongDto {
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  albumId?: string;

  @IsString()
  @IsOptional()
  artistId?: string;

  @IsString()
  @IsOptional()
  genreId?: string;

  @IsBoolean()
  @IsOptional()
  hidden?: boolean;

  @IsUrl()
  @IsOptional()
  imageUrl?: string;

  @IsUrl()
  @IsNotEmpty()
  fileUrl: string;
}
