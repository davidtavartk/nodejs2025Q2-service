import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Favorites } from 'src/favorites/entities/favorites.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  login: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ default: 1 })
  version: number;

  @CreateDateColumn({
    type: 'bigint',
    transformer: { to: (value) => value, from: (value) => parseInt(value) },
  })
  createdAt: number;

  @UpdateDateColumn({
    type: 'bigint',
    transformer: { to: (value) => value, from: (value) => parseInt(value) },
  })
  updatedAt: number;

  @OneToMany(() => Favorites, (favorite) => favorite.user, { cascade: true })
  favorites: Favorites[];
}
