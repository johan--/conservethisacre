import { AuthService } from '../services/auth.service';
import { Inject, Singleton } from 'typescript-ioc';
import { Post } from '../decorators/route.decorator';
import { Context } from 'koa';
import { AuthenticateData } from '../../../src/app/auth/models/authenticate';
import { Response } from './response';

@Singleton
export class AuthController {

  @Inject
  private authService: AuthService;

  /**
   * Signs user in
   * @param {Application.Context} ctx
   * @returns {Promise<any>}
   */
  @Post('/api/auth/signin')
  public async signin(ctx: Context): Promise<Response<AuthenticateData>> {
    const {email = null, password = null, accessToken = null} = ctx.request.body || {};

    console.log(`Logging in with username: ${email}, ${accessToken}`);
    const authData = await (accessToken ? this.authService.facebookSignin(accessToken) : this.authService.signin(email, password));

    return authData ? Response.success(authData) : Response.error(404, 'Username or password incorrect');
  }

  /**
   * Verify user token
   * @param {Application.Context} ctx
   * @returns {Promise<any>}
   */
  @Post('/api/auth/verify')
  public async verify(ctx: Context): Promise<Response<AuthenticateData>> {
    const {token = ''} = ctx.request.body || {};

    // console.log(`Logging in with username: ${username}`);
    const authData = await this.authService.verify(token);
    // const authData = null;

    return authData ? Response.success(authData) : Response.error(404, 'Username or password incorrect');
  }
}
