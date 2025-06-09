import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { Album } from './entities/album.entity';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { TrackService } from 'src/track/track.service';

@Injectable()
export class AlbumService {
  private albums: Album[] = [];

  constructor(
    @Inject(forwardRef(() => TrackService)) private trackService: TrackService,
  ) {}

  async getAllAlbums() {
    return this.albums;
  }

  async getAlbumById(id: string) {
    return this.albums.find((album) => album.id === id) || null;
  }

  async create(createAlbumDto: CreateAlbumDto) {
    const newAlbum = new Album();
    newAlbum.id = randomUUID();
    newAlbum.name = createAlbumDto.name;
    newAlbum.year = createAlbumDto.year;
    newAlbum.artistId = createAlbumDto.artistId;

    this.albums.push(newAlbum);
    return newAlbum;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = this.albums.find((a) => a.id === id);
    if (!album) return null;

    album.name = updateAlbumDto.name;
    album.year = updateAlbumDto.year;
    album.artistId = updateAlbumDto.artistId;

    return album;
  }

  async remove(id: string) {
    const albumIndex = this.albums.findIndex((a) => a.id === id);
    if (albumIndex === -1) return false;

    this.trackService.setAlbumIdToNull(id);

    this.albums.splice(albumIndex, 1);
    return true;
  }
  setArtistIdToNull(artistId: string) {
    this.albums.forEach((album) => {
      if (album.artistId === artistId) {
        album.artistId = null;
      }
    });
  }
}
