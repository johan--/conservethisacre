import { Container, Inject } from 'typescript-ioc';
import * as Koa from 'koa';
import { routesInitializer } from './initializers/routes.initializer';
import { databaseInitializer } from './initializers/db.initializer';
import Application = require('koa');
import { UserController } from './controllers/user.controller';
import { ParcelController } from './controllers/parcel.controller';
import { ForestController } from './controllers/forest.controller';

const koaBody = require('koa-body');


class App {

  private app: Application;

  @Inject
  private userController: UserController;

  @Inject
  private forestController: ForestController;

  @Inject
  private parcelController: ParcelController;

  private initializers = [
    routesInitializer, databaseInitializer
  ];

  constructor() {
    const app = this.app = new Koa();

    // use cross origin policy
    app.use(koaBody());

    this.initializers.forEach(initializer => initializer(app));

    app.listen(3000);
  }
}

Container.get(App);
