import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { Artist } from './entities/artist.entity';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { TrackService } from 'src/track/track.service';
import { AlbumService } from 'src/album/album.service';

@Injectable()
export class ArtistService {
  private artists: Artist[] = [];

  constructor(
    @Inject(forwardRef(() => TrackService)) private trackService: TrackService,
    @Inject(forwardRef(() => AlbumService)) private albumService: AlbumService,
  ) {}

  async getAllArtists() {
    return this.artists;
  }

  async getArtistById(id: string) {
    return this.artists.find((artist) => artist.id === id) || null;
  }

  async create(createArtistDto: CreateArtistDto) {
    const newArtist = new Artist();
    newArtist.id = randomUUID();
    newArtist.name = createArtistDto.name;
    newArtist.grammy = createArtistDto.grammy;

    this.artists.push(newArtist);
    return newArtist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = this.artists.find((a) => a.id === id);
    if (!artist) return null;

    artist.name = updateArtistDto.name;
    artist.grammy = updateArtistDto.grammy;

    return artist;
  }

  async remove(id: string) {
    const artistIndex = this.artists.findIndex((a) => a.id === id);
    if (artistIndex === -1) return false;

    this.trackService.setArtistIdToNull(id);
    this.albumService.setArtistIdToNull(id);

    this.artists.splice(artistIndex, 1);
    return true;
  }
}
