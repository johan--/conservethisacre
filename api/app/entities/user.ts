import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class User extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable : true})
  firstName: string;

  @Column({nullable : true})
  lastName: string;

  @Column()
  email: string;

  @Column({nullable : true})
  salt: string;

  @Column({nullable : true})
  password: string;

  @Column({nullable : true})
  accessToken: string;
}
