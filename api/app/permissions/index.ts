import { IRouterContext } from 'koa-router';

/**
 * Checks if logged user is admin
 * @param {Router.IRouterContext} ctx
 * @param {() => Promise<any>} next
 */
export const isAdmin = (ctx: IRouterContext, next : () => Promise<any>) => {

}

/**
 * Checks if logged user is logged
 * @param {Router.IRouterContext} ctx
 * @param {() => Promise<any>} next
 */
export const isLogged = (ctx: IRouterContext, next : () => Promise<any>) => {

}