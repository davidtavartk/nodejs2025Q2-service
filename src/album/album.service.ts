import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Album } from './entities/album.entity';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { TrackService } from 'src/track/track.service';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,
    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,
  ) {}

  async getAllAlbums() {
    return await this.albumRepository.find();
  }

  async getAlbumById(id: string) {
    return await this.albumRepository.findOne({ where: { id } });
  }

  async create(createAlbumDto: CreateAlbumDto) {
    const newAlbum = this.albumRepository.create(createAlbumDto);
    return await this.albumRepository.save(newAlbum);
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = await this.albumRepository.findOne({ where: { id } });
    if (!album) return null;

    await this.albumRepository.update(id, updateAlbumDto);
    return await this.albumRepository.findOne({ where: { id } });
  }

  async remove(id: string) {
    const album = await this.albumRepository.findOne({ where: { id } });
    if (!album) return false;

    await this.trackService.setAlbumIdToNull(id);

    const result = await this.albumRepository.delete(id);
    return result.affected > 0;
  }

  async setArtistIdToNull(artistId: string) {
    await this.albumRepository.update({ artistId }, { artistId: null });
  }
}
