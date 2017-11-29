import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from 'typeorm';
import { Forest } from './forest';

@Entity()
export class Parcel extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cost: number;

  @ManyToOne( type => Forest, forest => forest.parcels)
  forest: string;

  @Column('polygon')
  area;
}
