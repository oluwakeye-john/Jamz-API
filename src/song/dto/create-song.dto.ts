import { IsNotEmpty, IsOptional, IsUrl } from 'class-validator';

export class CreateSongDto {
  @IsNotEmpty()
  name: string;

  albumId?: string;
  categoryId?: string;
  artistId?: string;
  genreId?: string;
  hidden?: boolean;

  @IsUrl()
  @IsOptional()
  imageUrl?: string;

  @IsUrl()
  @IsNotEmpty()
  fileUrl: string;
}
