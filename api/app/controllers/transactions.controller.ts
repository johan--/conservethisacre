import { Get } from '../decorators/route.decorator';
import { IRouterContext } from 'koa-router';
import { User } from '../entities/user';
import { Response } from './response';
import { decode } from 'jsonwebtoken';
import { Transaction } from '../entities/transaction';
import { Auth } from '../middleware/permissions.middleware';


export class TransactionsController{

  /**
   * Finds all available users
   * @param {Router.IRouterContext} ctx
   * @param {Function} next
   * @returns {Promise<void>}
   */
  @Get('/api/transactions/own', Auth)
  public async findAll(ctx: IRouterContext, next: Function) {

    const user = await User.findOneById(ctx.user.id);

    const trns = await Transaction.getRepository().find({
      join: {
        alias: 'transaction',
        innerJoinAndSelect: {parcel: 'transaction.parcel'}
      },
      where : {
        'userId' : user.id
      }
    });

    return Response.success(trns);
  }
}
