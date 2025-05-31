import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DatunaService } from './datuna.service';
import { CreateDatunaDto } from './dto/create-datuna.dto';
import { UpdateDatunaDto } from './dto/update-datuna.dto';

@Controller('datuna')
export class DatunaController {
  constructor(private readonly datunaService: DatunaService) {}

  @Post()
  create(@Body() createDatunaDto: CreateDatunaDto) {
    return this.datunaService.create(createDatunaDto);
  }

  @Get()
  findAll() {
    return this.datunaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.datunaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDatunaDto: UpdateDatunaDto) {
    return this.datunaService.update(+id, updateDatunaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.datunaService.remove(+id);
  }
}
