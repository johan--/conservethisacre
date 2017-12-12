import { User } from '../app/entities/user';
import { Forest } from '../app/entities/forest';
import { Parcel } from '../app/entities/parcel';
import { ForestImage } from '../app/entities/forest-image';
import { ParcelImage } from '../app/entities/parcel-image';
import { Transaction } from '../app/entities/transaction';

export const environment = {
  facebook : {
    appId : '573983026276728',
    apiVersion : 'v2.9',
    apiURL : 'https://graph.facebook.com',
    appSecret: '0420ab38063d84e8a77864612dd8485b'
  },

  database: {
    type: 'mysql',
    url: DATABASE_URL,
    entities: [
      User, Forest, Parcel, ForestImage, ParcelImage, Transaction
    ],
    synchronize: true,
    logging: true
  }
};
