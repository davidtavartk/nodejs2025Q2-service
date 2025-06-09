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
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  async getAllAlbums() {
    return this.albumService.getAllAlbums();
  }

  @Get(':id')
  async getAlbumById(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new HttpException(
        'Invalid album ID (not UUID)',
        HttpStatus.BAD_REQUEST,
      );
    }

    const album = await this.albumService.getAlbumById(id);
    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }

    return album;
  }

  @Post()
  async createAlbum(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto);
  }

  @Put(':id')
  async updateAlbum(
    @Param('id') id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    if (!isUUID(id)) {
      throw new HttpException(
        'Invalid album ID (not UUID)',
        HttpStatus.BAD_REQUEST,
      );
    }

    const album = await this.albumService.update(id, updateAlbumDto);
    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }

    return album;
  }

  @Delete(':id')
  async deleteAlbum(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new HttpException(
        'Invalid album ID (not UUID)',
        HttpStatus.BAD_REQUEST,
      );
    }

    const deleted = await this.albumService.remove(id);
    if (!deleted) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }

    throw new HttpException('', HttpStatus.NO_CONTENT);
  }
}
