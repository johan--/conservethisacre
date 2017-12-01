import { User } from '../app/entities/user';
import { Forest } from '../app/entities/forest';
import { Parcel } from '../app/entities/parcel';

export const environment = {
  database: {
    type: 'mysql',
    url: DATABASE_URL,
    entities: [
      User, Forest, Parcel
    ],
    synchronize: true,
    logging: true
  }
};
