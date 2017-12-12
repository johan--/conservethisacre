import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Forest } from './forest';
import { Parcel } from './parcel';

@Entity()
export class ParcelImage extends BaseEntity {
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

  @ManyToOne(type => Parcel, parcel => parcel.images)
  parcel: Parcel;

}
