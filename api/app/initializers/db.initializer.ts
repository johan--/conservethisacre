import 'reflect-metadata';
import {createConnection} from 'typeorm';
import {User} from '../entities/user';
import * as Application from 'koa';
import { Forest } from '../entities/forest';
import { Parcel } from '../entities/parcel';

export const databaseInitializer = (app: Application) => {

  createConnection({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'conserve',
    entities: [
      User, Forest, Parcel
    ],
    synchronize: true,
    logging: true
  }).then(connection => {
    console.log('Database initialized');
  }).catch(error => console.log(error));
};
