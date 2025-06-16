import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { TrackService } from '../track/track.service';
import { AlbumService } from '../album/album.service';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,
    @Inject(forwardRef(() => AlbumService))
    private albumService: AlbumService,
  ) {}

  async getAllArtists() {
    return await this.artistRepository.find();
  }

  async getArtistById(id: string) {
    return await this.artistRepository.findOne({ where: { id } });
  }

  async create(createArtistDto: CreateArtistDto) {
    const newArtist = this.artistRepository.create(createArtistDto);
    return await this.artistRepository.save(newArtist);
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = await this.artistRepository.findOne({ where: { id } });
    if (!artist) return null;

    await this.artistRepository.update(id, updateArtistDto);
    return await this.artistRepository.findOne({ where: { id } });
  }

  async remove(id: string) {
    const artist = await this.artistRepository.findOne({ where: { id } });
    if (!artist) return false;

    // Update related albums and tracks to set artistId to null
    await this.albumService.setArtistIdToNull(id);
    await this.trackService.setArtistIdToNull(id);

    const result = await this.artistRepository.delete(id);
    return result.affected > 0;
  }
}
