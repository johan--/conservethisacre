import { Container, Inject } from 'typescript-ioc';
import * as Koa from 'koa';
import { routesInitializer } from './initializers/routes.initializer';
import { databaseInitializer } from './initializers/db.initializer';
import * as Application from 'koa';
import { UserController } from './controllers/user.controller';
import { ParcelController } from './controllers/parcel.controller';
import { ForestController } from './controllers/forest.controller';
import { AuthController } from './controllers/auth.controller';

import * as koaBody from 'koa-body';

import { existsSync, mkdirSync } from 'fs';
import { TransactionsController } from './controllers/transactions.controller';

let app = null;

export class App {

  private app: Application;

  @Inject
  private userController: UserController;

  @Inject
  private forestController: ForestController;

  @Inject
  private parcelController: ParcelController;

  @Inject
  private authController: AuthController;

  @Inject
  private transactionsController: TransactionsController;

  private initializers = [
    routesInitializer, databaseInitializer
  ];

  constructor() {
    app = this.app = new Koa();

    app.use(koaBody({
      formidable: {uploadDir: './uploads'},
      multipart: true,
      urlencoded: true
    }));

    console.log('Initializing', S3_REGION);
    this.initializers.forEach(initializer => initializer(app));

    // temp
    if (!existsSync('uploads')) {
      mkdirSync('uploads');
    }

    app.listen(3000);
  }

  static getApp() {
    return app;
  }
}
Container.get(App);
