import { User } from '../app/entities/user';

export const environment = {
  server: {
    port: 8085
  },

  database: {
    type: 'mysql',
    url: DATABASE_URL,
    entities: [
      User
    ],
    synchronize: true,
    logging: true
  }
};
