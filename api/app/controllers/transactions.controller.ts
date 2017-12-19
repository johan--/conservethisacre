import { Get } from '../decorators/route.decorator';
import { IRouterContext } from 'koa-router';
import { User } from '../entities/user';
import { Response } from './response';
import { decode } from 'jsonwebtoken';
import { Transaction } from '../entities/transaction';
import { Forest } from '../entities/forest';


export class TransactionsController{

  /**
   * Finds all available users
   * @param {Router.IRouterContext} ctx
   * @param {Function} next
   * @returns {Promise<void>}
   */
  @Get('/api/transactions/own')
  public async findAll(ctx: IRouterContext, next: Function) {

    ///// TEMP: Will be moved to auth middleware
    const authorizationHeader = (ctx.headers.Authorization || ctx.headers.authorization);
    const authtoken = (authorizationHeader || '').split(' ').pop();
    const tokenObj = decode(authtoken);

    if (!tokenObj) {
      return Response.error(401, 'Not authorized');
    }

    const user = await User.findOneById(tokenObj.userId);
    if (user.accessToken != authtoken) {
      return Response.error(401, 'No authorized');
    }
    //// TEMP

    const trns = await Transaction.getRepository().find( {
      join: {
        alias: 'transaction',
        innerJoinAndSelect: {parcel: 'transaction.parcel'}
      }
    });

console.log('\n\n', trns);
    // const trns = await Transaction.find({userId : user.id});
    // await Promise.all(trns.map(async trn => {
    //   trn.parcelRef = await trn.parcel;
    //   return trn.parcel;
    // }));

    return Response.success(trns);
  }
}
