import { sign } from 'jsonwebtoken';
import { createHash } from 'crypto';
import { AuthenticateData } from '../../../src/app/auth/models/authenticate';
import { User } from '../entities/user';
import { FacebookService } from './facebook.service';
import { Inject } from 'typescript-ioc';

const SECRET_KEY = 'ts3A2jF2BUZMDthgaQyIy7CxbvH5YisrW0vuPUR7';

export class AuthService {

  @Inject
  facebookService: FacebookService

  /**
   * Signs in user with given username and password
   * @param username
   * @param password
   */
  public async signin(email, password): Promise<AuthenticateData> {
    const user = await User.findOne({email});
    console.log(user);
    // Check exists
    if (!user) {
      return null;
    }

    // Check password
    const encodedPassword = this.encode(password, user.salt);
    if (encodedPassword != user.password) {
      return null;
    }

    const token = sign({userId: user.id}, SECRET_KEY);

    user.accessToken = token;
    await user.save();

    const cloned = {...user} as Partial<User>;
    delete cloned.password;
    delete cloned.salt;

    return {user: cloned, token};
  }

  /**
   * Processes login with facebook. Tries to find user by given token. If user exists - lookup
   * user in our database by email. If there is no such user - create new one, otherwise use existing
   * @param {string} accessToken
   * @returns {Promise<AuthenticateData>}
   */
  public async facebookSignin(accessToken: string): Promise<AuthenticateData> {
    const credentials = await this.facebookService.GetUserCredentials(accessToken);

    if (!credentials || !credentials.email) {
      return null;
    }

    let user = await User.findOne({email: credentials.email});

    if (!user) {
      user = new User();
      user.email = credentials.email;
      user.firstName = credentials.first_name;
      user.lastName = credentials.last_name;

      await user.save();
    }

    const token = sign({userId: user.id}, SECRET_KEY);
    user.accessToken = token;
    await user.save();

    const cloned = {...user} as Partial<User>;

    delete cloned.password;
    delete cloned.salt;

    return {user: cloned, token};
  }

  /**
   * Verifies token and returns authenticate data if token exists
   * @param username
   * @param password
   */
  public async verify(accessToken: string): Promise<AuthenticateData> {
    const user = await User.findOne({accessToken});
    return {user, token: accessToken};
  }

  /**
   * Encodes password using sha 256
   */
  private encode(pwd: string, salt: string) {
    return createHash('sha256').update(pwd + ':' + salt).digest('hex');
  }
}
