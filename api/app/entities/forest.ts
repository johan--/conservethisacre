import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from 'typeorm';
import { Parcel } from './parcel';

@Entity()
export class Forest extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable : true})
  description: string;

  @OneToMany(type => Parcel, parcel => parcel.forest)
  parcels: Parcel[];
}
