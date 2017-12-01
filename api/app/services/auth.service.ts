import { sign } from 'jsonwebtoken';
import { createHash } from 'crypto';
import { AuthenticateData } from '../../../src/app/auth/models/authenticate';
import { User } from '../entities/user';

const SECRET_KEY = 'ts3A2jF2BUZMDthgaQyIy7CxbvH5YisrW0vuPUR7';

export class AuthService {

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

    user.save();

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
    return {user, token : accessToken};
  }

  /**
   * Encodes password using sha 256
   */
  private encode(pwd: string, salt: string) {
    return createHash('sha256').update(pwd + ':' + salt).digest('hex');
  }
}
