import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Track } from './entities/track.entity';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,
  ) {}

  async getAllTracks() {
    return await this.trackRepository.find();
  }

  async getTrackById(id: string) {
    return await this.trackRepository.findOne({ where: { id } });
  }

  async create(createTrackDto: CreateTrackDto) {
    const newTrack = this.trackRepository.create(createTrackDto);
    return await this.trackRepository.save(newTrack);
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = await this.trackRepository.findOne({ where: { id } });
    if (!track) return null;

    await this.trackRepository.update(id, updateTrackDto);
    return await this.trackRepository.findOne({ where: { id } });
  }

  async remove(id: string) {
    const result = await this.trackRepository.delete(id);
    return result.affected > 0;
  }

  async setArtistIdToNull(artistId: string) {
    await this.trackRepository.update({ artistId }, { artistId: null });
  }

  async setAlbumIdToNull(albumId: string) {
    await this.trackRepository.update({ albumId }, { albumId: null });
  }
}
