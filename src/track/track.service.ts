// track/track.service.ts
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { Track } from './entities/track.entity';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TrackService {
  private tracks: Track[] = [];

  async getAllTracks() {
    return this.tracks;
  }

  async getTrackById(id: string) {
    return this.tracks.find((track) => track.id === id) || null;
  }

  async create(createTrackDto: CreateTrackDto) {
    const newTrack = new Track();
    newTrack.id = randomUUID();
    newTrack.name = createTrackDto.name;
    newTrack.artistId = createTrackDto.artistId;
    newTrack.albumId = createTrackDto.albumId;
    newTrack.duration = createTrackDto.duration;

    this.tracks.push(newTrack);
    return newTrack;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = this.tracks.find((t) => t.id === id);
    if (!track) return null;

    track.name = updateTrackDto.name;
    track.artistId = updateTrackDto.artistId;
    track.albumId = updateTrackDto.albumId;
    track.duration = updateTrackDto.duration;

    return track;
  }

  async remove(id: string) {
    const trackIndex = this.tracks.findIndex((t) => t.id === id);
    if (trackIndex === -1) return false;

    this.tracks.splice(trackIndex, 1);
    return true;
  }

  setArtistIdToNull(artistId: string) {
    this.tracks.forEach((track) => {
      if (track.artistId === artistId) {
        track.artistId = null;
      }
    });
  }
  setAlbumIdToNull(albumId: string) {
    this.tracks.forEach((track) => {
      if (track.albumId === albumId) {
        track.albumId = null;
      }
    });
  }
}
