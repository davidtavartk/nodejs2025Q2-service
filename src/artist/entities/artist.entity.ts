import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('artists')
export class Artist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'boolean', default: false })
  grammy: boolean;
}
