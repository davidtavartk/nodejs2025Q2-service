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
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  async getAllTracks() {
    return this.trackService.getAllTracks();
  }

  @Get(':id')
  async getTrackById(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new HttpException(
        'Invalid track ID (not UUID)',
        HttpStatus.BAD_REQUEST,
      );
    }

    const track = await this.trackService.getTrackById(id);
    if (!track) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }

    return track;
  }

  @Post()
  async createTrack(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.create(createTrackDto);
  }

  @Put(':id')
  async updateTrack(
    @Param('id') id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    if (!isUUID(id)) {
      throw new HttpException(
        'Invalid track ID (not UUID)',
        HttpStatus.BAD_REQUEST,
      );
    }

    const track = await this.trackService.update(id, updateTrackDto);
    if (!track) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }

    return track;
  }

  @Delete(':id')
  async deleteTrack(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new HttpException(
        'Invalid track ID (not UUID)',
        HttpStatus.BAD_REQUEST,
      );
    }

    const deleted = await this.trackService.remove(id);
    if (!deleted) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }

    throw new HttpException('', HttpStatus.NO_CONTENT);
  }
}
