import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Parcel } from './parcel';

@Entity()
export class ParcelPanorama extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column()
  awsThumbnailKey: string;

  @Column()
  thumbnailUrl: string;

  @Column()
  awsKey: string;

  @ManyToOne(type => Parcel, parcel => parcel.panoramas)
  parcel: Parcel;

}
