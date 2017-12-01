import * as Router from 'koa-router';
import { IMiddleware } from 'koa-router';
import { Context } from 'koa';
import { Response } from '../controllers/response';

export const router = new Router();

/**
 * Creates new route using koa router
 *
 * @param {string} path
 * @param {string} method
 * @param {Router.IMiddleware} middleware
 * @returns {(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => any}
 */
export const route = (path: string, method: string, ...middleware: Array<IMiddleware>) => {
  return (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => {
    router[method](path, ...middleware, async (ctx: Context, next: Function) => {
      try {
        ctx.body = await descriptor.value.call(target, ctx);
        next();
      } catch (e) {
        // add error header?
        ctx.body = Response.error(500, e.message);
      }
    });
  };
}

/**
 * Route decorator. Creates route that uses GET method
 * @param {string} path
 * @param {Router.IMiddleware} middleware
 * @returns {(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => any}
 */
export function Get(path: string, ...middleware: Array<IMiddleware>) {
  return route(path, 'get', ...middleware);
}

/**
 * Route decorator. Creates route thta uses POST method
 * @param {string} path
 * @param {Router.IMiddleware} middleware
 * @returns {(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => any}
 * @constructor
 */
export function Post(path: string, ...middleware: Array<IMiddleware>) {
  return route(path, 'post', ...middleware);
}

/**
 * Route decorator. Creates route that uses DELETE method
 * @param {string} path
 * @param {Router.IMiddleware} middleware
 * @returns {(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => any}
 * @constructor
 */
export function Delete(path: string, ...middleware: Array<IMiddleware>) {
  return route(path, 'delete', ...middleware);
}
