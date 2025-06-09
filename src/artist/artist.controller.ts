import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { isUUID } from 'class-validator';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  async getAllArtists() {
    return this.artistService.getAllArtists();
  }

  @Get(':id')
  async getArtistById(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new HttpException(
        'Invalid artist ID (not UUID)',
        HttpStatus.BAD_REQUEST,
      );
    }

    const artist = await this.artistService.getArtistById(id);
    if (!artist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }

    return artist;
  }

  @Post()
  async createArtist(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.create(createArtistDto);
  }

  @Put(':id')
  async updateArtist(
    @Param('id') id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    if (!isUUID(id)) {
      throw new HttpException(
        'Invalid artist ID (not UUID)',
        HttpStatus.BAD_REQUEST,
      );
    }

    const artist = await this.artistService.update(id, updateArtistDto);
    if (!artist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }

    return artist;
  }

  @Delete(':id')
  async deleteArtist(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new HttpException(
        'Invalid artist ID (not UUID)',
        HttpStatus.BAD_REQUEST,
      );
    }

    const deleted = await this.artistService.remove(id);
    if (!deleted) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }

    throw new HttpException('', HttpStatus.NO_CONTENT);
  }
}
