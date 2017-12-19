import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, JoinColumn } from 'typeorm';
import { Parcel } from './parcel';
import { ForestImage } from './forest-image';

@Entity()
export class Forest extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: true})
  description: string;

  @OneToMany(type => Parcel, parcel => parcel.forest)
  @JoinColumn()
  _parcels: Promise<Parcel[]>;

  parcels: Parcel[];

  @OneToMany(type => ForestImage, image => image.forest, {eager: true})
  images: ForestImage[];
}
