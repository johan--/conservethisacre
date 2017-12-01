import * as Application from 'koa';
import { router } from '../decorators/route.decorator';

export const routesInitializer = (app: Application) => {
    app.use(router.routes());
}
