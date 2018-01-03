
import { User } from '../entities/user';
import { ROLE_ADMIN } from '../middleware/permissions.middleware';

// ?? draft
export interface UserRequest extends Partial<User>{
  isAdmin: boolean;
}

export class UserService {

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
}
