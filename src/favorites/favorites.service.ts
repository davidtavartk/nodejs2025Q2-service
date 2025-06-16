import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorites } from './entities/favorites.entity';
import { FavoritesResponse } from './dto/favorites-response.dto';
import { ArtistService } from '../artist/artist.service';
import { AlbumService } from '../album/album.service';
import { TrackService } from '../track/track.service';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorites)
    private favoritesRepository: Repository<Favorites>,
    private artistService: ArtistService,
    private albumService: AlbumService,
    private trackService: TrackService,
  ) {}

  async getAllFavorites(): Promise<FavoritesResponse> {
    const favorites = await this.favoritesRepository.find({
      relations: ['artist', 'album', 'track'],
    });

    const artists = favorites
      .filter((fav) => fav.artist)
      .map((fav) => fav.artist);

    const albums = favorites.filter((fav) => fav.album).map((fav) => fav.album);

    const tracks = favorites.filter((fav) => fav.track).map((fav) => fav.track);

    return {
      artists: [...new Map(artists.map((a) => [a.id, a])).values()],
      albums: [...new Map(albums.map((a) => [a.id, a])).values()],
      tracks: [...new Map(tracks.map((t) => [t.id, t])).values()],
    };
  }

  async addTrackToFavorites(trackId: string): Promise<boolean> {
    const track = await this.trackService.getTrackById(trackId);
    if (!track) return false;

    const existing = await this.favoritesRepository.findOne({
      where: { trackId, userId: 'default-user' }, // For now using default user
    });

    if (!existing) {
      const favorite = this.favoritesRepository.create({
        trackId,
        userId: 'default-user',
      });
      await this.favoritesRepository.save(favorite);
    }
    return true;
  }

  async removeTrackFromFavorites(trackId: string): Promise<boolean> {
    const result = await this.favoritesRepository.delete({
      trackId,
      userId: 'default-user',
    });
    return result.affected > 0;
  }

  async addAlbumToFavorites(albumId: string): Promise<boolean> {
    const album = await this.albumService.getAlbumById(albumId);
    if (!album) return false;

    const existing = await this.favoritesRepository.findOne({
      where: { albumId, userId: 'default-user' },
    });

    if (!existing) {
      const favorite = this.favoritesRepository.create({
        albumId,
        userId: 'default-user',
      });
      await this.favoritesRepository.save(favorite);
    }
    return true;
  }

  async removeAlbumFromFavorites(albumId: string): Promise<boolean> {
    const result = await this.favoritesRepository.delete({
      albumId,
      userId: 'default-user',
    });
    return result.affected > 0;
  }

  async addArtistToFavorites(artistId: string): Promise<boolean> {
    const artist = await this.artistService.getArtistById(artistId);
    if (!artist) return false;

    const existing = await this.favoritesRepository.findOne({
      where: { artistId, userId: 'default-user' },
    });

    if (!existing) {
      const favorite = this.favoritesRepository.create({
        artistId,
        userId: 'default-user',
      });
      await this.favoritesRepository.save(favorite);
    }
    return true;
  }

  async removeArtistFromFavorites(artistId: string): Promise<boolean> {
    const result = await this.favoritesRepository.delete({
      artistId,
      userId: 'default-user',
    });
    return result.affected > 0;
  }
}
