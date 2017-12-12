import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToMany } from 'typeorm';
import { Forest } from './forest';
import { ParcelImage } from './parcel-image';
import { Transaction } from './transaction';

@Entity()
export class Parcel extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: true})
  cost: number;

  @ManyToOne(type => Forest, forest => forest.parcels, {eager: true})
  forest: Forest;

  @Column({type: 'polygon', nullable: true})
  area;

  @OneToMany(type => ParcelImage, image => image.parcel, {eager: true})
  images: ParcelImage[];

  @OneToMany(type => Transaction, transaction => transaction.parcel, {eager: true})
  transactions: Transaction[];
}
