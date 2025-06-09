import { Injectable } from '@nestjs/common';
import { Favorites } from './entities/favorites.entity';
import { FavoritesResponse } from './dto/favorites-response.dto';
import { ArtistService } from '../artist/artist.service';
import { AlbumService } from '../album/album.service';
import { TrackService } from '../track/track.service';

@Injectable()
export class FavoritesService {
  private favorites: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  constructor(
    private artistService: ArtistService,
    private albumService: AlbumService,
    private trackService: TrackService,
  ) {}

  async getAllFavorites(): Promise<FavoritesResponse> {
    const favoriteArtists = [];
    const favoriteAlbums = [];
    const favoriteTracks = [];

    for (const artistId of this.favorites.artists) {
      const artist = await this.artistService.getArtistById(artistId);
      if (artist) favoriteArtists.push(artist);
    }

    for (const albumId of this.favorites.albums) {
      const album = await this.albumService.getAlbumById(albumId);
      if (album) favoriteAlbums.push(album);
    }

    for (const trackId of this.favorites.tracks) {
      const track = await this.trackService.getTrackById(trackId);
      if (track) favoriteTracks.push(track);
    }

    return {
      artists: favoriteArtists,
      albums: favoriteAlbums,
      tracks: favoriteTracks,
    };
  }

  async addTrackToFavorites(trackId: string): Promise<boolean> {
    const track = await this.trackService.getTrackById(trackId);
    if (!track) return false;

    if (!this.favorites.tracks.includes(trackId)) {
      this.favorites.tracks.push(trackId);
    }
    return true;
  }

  async removeTrackFromFavorites(trackId: string): Promise<boolean> {
    const index = this.favorites.tracks.indexOf(trackId);
    if (index === -1) return false;

    this.favorites.tracks.splice(index, 1);
    return true;
  }

  async addAlbumToFavorites(albumId: string): Promise<boolean> {
    const album = await this.albumService.getAlbumById(albumId);
    if (!album) return false;

    if (!this.favorites.albums.includes(albumId)) {
      this.favorites.albums.push(albumId);
    }
    return true;
  }

  async removeAlbumFromFavorites(albumId: string): Promise<boolean> {
    const index = this.favorites.albums.indexOf(albumId);
    if (index === -1) return false;

    this.favorites.albums.splice(index, 1);
    return true;
  }

  async addArtistToFavorites(artistId: string): Promise<boolean> {
    const artist = await this.artistService.getArtistById(artistId);
    if (!artist) return false;

    if (!this.favorites.artists.includes(artistId)) {
      this.favorites.artists.push(artistId);
    }
    return true;
  }

  async removeArtistFromFavorites(artistId: string): Promise<boolean> {
    const index = this.favorites.artists.indexOf(artistId);
    if (index === -1) return false;

    this.favorites.artists.splice(index, 1);
    return true;
  }

  removeArtistById(artistId: string) {
    const index = this.favorites.artists.indexOf(artistId);
    if (index !== -1) {
      this.favorites.artists.splice(index, 1);
    }
  }

  removeAlbumById(albumId: string) {
    const index = this.favorites.albums.indexOf(albumId);
    if (index !== -1) {
      this.favorites.albums.splice(index, 1);
    }
  }

  removeTrackById(trackId: string) {
    const index = this.favorites.tracks.indexOf(trackId);
    if (index !== -1) {
      this.favorites.tracks.splice(index, 1);
    }
  }
}
