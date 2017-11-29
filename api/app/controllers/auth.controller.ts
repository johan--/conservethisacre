import { Get, Post } from '../decorators/route.decorator';
import { AuthService } from '../services/auth.service';
import { Inject, Singleton } from 'typescript-ioc';
import { Context } from 'koa';

@Singleton
export class AuthController {

  @Inject
  private authService: AuthService;
}
