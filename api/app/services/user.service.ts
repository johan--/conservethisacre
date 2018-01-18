import { User } from '../entities/user';
import { ROLE_ADMIN } from '../middleware/permissions.middleware';
import { AuthService } from './auth.service';
import * as crypto from 'crypto';
import { Inject } from 'typescript-ioc';

// ?? draft
export interface UserRequest extends Partial<User> {
  isAdmin: boolean;
}

export class UserService {

  @Inject
  authService: AuthService;

  /**
   * Saves user data
   * @param {UserRequest} data
   */
  async save(data: UserRequest) {
    const user = data.id ? await User.findOneById(data.id) : new User();

    user.email = data.email;
    user.firstName = data.firstName;
    user.lastName = data.lastName;
    user.role = data.isAdmin ? ROLE_ADMIN : '';

    await user.save();
  }

  /**
   * Creates new user with provided email password and role
   * @param email
   * @param password
   * @param role
   * @returns {Promise<void>}
   */
  async create(email, password, role): Promise<User> {
    if (await User.findOne({email})) {
      throw new Error('Can not create user - name already exists');
    }

    const user = new User();
    const salt = crypto.randomBytes(16).toString('hex');

    user.email = email;
    user.role = role;
    user.salt = salt;
    user.password = this.authService.encode(password, salt);

    return await user.save();
  }
}
