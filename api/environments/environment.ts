import { User } from '../app/entities/user';

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
      User
    ],
    synchronize: true,
    logging: true
  }
};
