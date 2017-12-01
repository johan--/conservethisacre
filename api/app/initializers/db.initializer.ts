import 'reflect-metadata';
import { createConnection } from 'typeorm';
import * as Application from 'koa';
import { environment } from '../../environments/environment';

export const databaseInitializer = (app: Application) => {

  // TODO: temporary <any> here. something wrong with database.type matching
  console.log('\n\n\nConnecting to db:', environment.database);
  createConnection(<any>environment.database).then(connection => {
    console.log('Database initialized');
  }).catch(error => console.log(error));
};
