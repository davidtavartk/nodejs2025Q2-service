import { Injectable } from '@nestjs/common';
import { CreateDatunaDto } from './dto/create-datuna.dto';
import { UpdateDatunaDto } from './dto/update-datuna.dto';

@Injectable()
export class DatunaService {
  create(createDatunaDto: CreateDatunaDto) {
    return 'This action adds a new datuna';
  }

  findAll() {
    return `This action returns all datuna`;
  }

  findOne(id: number) {
    return `This action returns a #${id} datuna`;
  }

  update(id: number, updateDatunaDto: UpdateDatunaDto) {
    return `This action updates a #${id} datuna`;
  }

  remove(id: number) {
    return `This action removes a #${id} datuna`;
  }
}
