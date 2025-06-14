import { Exclude } from 'class-transformer';

export class User {
  id: string; // uuid v4
  login: string;

  @Exclude()
  password: string;

  version: number; // integer number, increments on updatep
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update
}
