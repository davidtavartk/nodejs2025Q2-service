import { Module } from '@nestjs/common';
import { DatunaService } from './datuna.service';
import { DatunaController } from './datuna.controller';

@Module({
  controllers: [DatunaController],
  providers: [DatunaService],
})
export class DatunaModule {}
