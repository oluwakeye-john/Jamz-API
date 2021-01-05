import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateArtistDto {
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsUrl()
  @IsOptional()
  imageUrl?: string;
}
