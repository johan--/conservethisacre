import { User } from '../app/entities/user';
import { Forest } from '../app/entities/forest';
import { Parcel } from '../app/entities/parcel';
import { ForestImage } from '../app/entities/forest-image';

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
      User, Forest, Parcel, ForestImage
    ],
    synchronize: true,
    logging: false
  }
};
