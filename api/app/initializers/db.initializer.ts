import 'reflect-metadata';
import { Connection, createConnection } from 'typeorm';
import * as Application from 'koa';
import { environment } from '../../environments/environment';

/**
 * Slightly modified version of the URL parsing from typeorm
 * Returns now user, rather then username and adds default port
 * @param {string} url
 * @returns {{host: string; user: string; password: string; port: number; database: string}}
 */
const parseConnectionUrl = (url: string) => {
  const firstSlashes = url.indexOf('//');
  const preBase = url.substr(firstSlashes + 2);
  const secondSlash = preBase.indexOf('/');
  const qMark = preBase.indexOf('?');
  const base = (secondSlash !== -1) ? preBase.substr(0, secondSlash) : preBase;
  const afterBase = (secondSlash !== -1) ?
    preBase.substr(secondSlash + 1, qMark != -1 ? qMark - secondSlash - 1 : preBase.length - secondSlash - 1) : undefined;
  const [usernameAndPassword, hostAndPort] = base.split('@');
  const [username, password] = usernameAndPassword.split(':');
  const [host, port] = hostAndPort.split(':');

  return {
    host: host,
    user: username,
    username: username,
    password: password,
    port: port ? parseInt(port, 10) : 3306,
    database: afterBase || undefined
  };
};

const createAdminUser = async (connection: Connection) => {
  const repositrory = connection.getRepository('user');
  const admin = await repositrory.findOne({email: 'admin'})
  if (!admin) {
    await repositrory.insert({
      'email': 'admin',
      'password': '44c5d6fa485c1d4c6bef684a5c746b0f57cd272a9361aeebc7b90122b46ed9ee',
      'salt': 'qwerty',
      'role': 'admin'
    });
    console.log('Created default admin user with password \'admin\'');
  }
};

export const databaseInitializer = (app: Application) => {

  const options = environment.database;
  const url = options['url'];

  let connectionOptions = url ? parseConnectionUrl(url) : environment.database;
  connectionOptions = {...connectionOptions, ...options};

  delete connectionOptions['url'];

  console.log('\n\n\nConnecting to db:', connectionOptions);

  // TODO: temporary <any> here. something wrong with database.type matching
  createConnection(<any>connectionOptions).then(connection => {
    createAdminUser(connection);
  }).catch(error => console.log(error));
};
