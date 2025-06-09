import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class UpdateArtistDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsBoolean()
  grammy: boolean;
}
