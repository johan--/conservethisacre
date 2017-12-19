import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToMany } from 'typeorm';
import { Parcel } from './parcel';
import { User } from './user';

@Entity()
export class Transaction extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable : true})
  amount: number;

  @Column({nullable : true})
  userId: number;

  @ManyToOne(type => Parcel, parcel => parcel.transactions)
  parcel: Promise<Parcel>;
  parcelRef: Parcel;

  @ManyToOne(type => User, user => user.transactions)
  user: User;
}
