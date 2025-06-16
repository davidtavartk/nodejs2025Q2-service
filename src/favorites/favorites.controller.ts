import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { isUUID } from 'class-validator';
import { FavoritesService } from './favorites.service';
import { Public } from 'src/auth/public.decorator';

@Public()
@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  async getAllFavorites() {
    return this.favoritesService.getAllFavorites();
  }

  @Post('track/:id')
  async addTrackToFavorites(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new HttpException(
        'Invalid track ID (not UUID)',
        HttpStatus.BAD_REQUEST,
      );
    }

    const added = await this.favoritesService.addTrackToFavorites(id);
    if (!added) {
      throw new HttpException(
        'Track not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return { message: 'Track added to favorites' };
  }

  @Delete('track/:id')
  async removeTrackFromFavorites(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new HttpException(
        'Invalid track ID (not UUID)',
        HttpStatus.BAD_REQUEST,
      );
    }

    const removed = await this.favoritesService.removeTrackFromFavorites(id);
    if (!removed) {
      throw new HttpException(
        'Track is not in favorites',
        HttpStatus.NOT_FOUND,
      );
    }

    throw new HttpException('', HttpStatus.NO_CONTENT);
  }

  @Post('album/:id')
  async addAlbumToFavorites(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new HttpException(
        'Invalid album ID (not UUID)',
        HttpStatus.BAD_REQUEST,
      );
    }

    const added = await this.favoritesService.addAlbumToFavorites(id);
    if (!added) {
      throw new HttpException(
        'Album not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return { message: 'Album added to favorites' };
  }

  @Delete('album/:id')
  async removeAlbumFromFavorites(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new HttpException(
        'Invalid album ID (not UUID)',
        HttpStatus.BAD_REQUEST,
      );
    }

    const removed = await this.favoritesService.removeAlbumFromFavorites(id);
    if (!removed) {
      throw new HttpException(
        'Album is not in favorites',
        HttpStatus.NOT_FOUND,
      );
    }

    throw new HttpException('', HttpStatus.NO_CONTENT);
  }

  @Post('artist/:id')
  async addArtistToFavorites(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new HttpException(
        'Invalid artist ID (not UUID)',
        HttpStatus.BAD_REQUEST,
      );
    }

    const added = await this.favoritesService.addArtistToFavorites(id);
    if (!added) {
      throw new HttpException(
        'Artist not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return { message: 'Artist added to favorites' };
  }

  @Delete('artist/:id')
  async removeArtistFromFavorites(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new HttpException(
        'Invalid artist ID (not UUID)',
        HttpStatus.BAD_REQUEST,
      );
    }

    const removed = await this.favoritesService.removeArtistFromFavorites(id);
    if (!removed) {
      throw new HttpException(
        'Artist is not in favorites',
        HttpStatus.NOT_FOUND,
      );
    }

    throw new HttpException('', HttpStatus.NO_CONTENT);
  }
}
