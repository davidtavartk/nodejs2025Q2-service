import { PartialType } from '@nestjs/mapped-types';
import { CreateDatunaDto } from './create-datuna.dto';

export class UpdateDatunaDto extends PartialType(CreateDatunaDto) {}
