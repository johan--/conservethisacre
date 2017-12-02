import { User } from '../app/entities/user';
import { Forest } from '../app/entities/forest';
import { Parcel } from '../app/entities/parcel';

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
      User, Forest, Parcel
    ],
    synchronize: true,
    logging: true
  }
};
