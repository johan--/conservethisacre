import { User } from '../app/entities/user';
import { Forest } from '../app/entities/forest';
import { Parcel } from '../app/entities/parcel';
import { ForestImage } from '../app/entities/forest-image';
import { ParcelImage } from '../app/entities/parcel-image';
import { Transaction } from '../app/entities/transaction';

export const environment = {
  server: {
    port: 8085
  },

  database: {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'conserve',
    entities: [
      User, Forest, Parcel, ForestImage, ParcelImage, Transaction
    ],
    synchronize: true,
    logging: false
  }
};
