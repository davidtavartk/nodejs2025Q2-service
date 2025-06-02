import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  IsUUID,
} from 'class-validator';

export class CreateAlbumDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  year: number;

  @IsOptional()
  @IsUUID()
  artistId: string | null;
}
