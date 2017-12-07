import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Forest } from './forest';

@Entity()
export class ForestImage extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column()
  awsThumbnailKey: string;

  @Column()
  awsKey: string;

  @Column()
  thumbnailUrl: string;

  @ManyToOne(type => Forest, forest => forest.images)
  forest: Forest;

}
