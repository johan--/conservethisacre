import { User } from '../../core/models/user';

export interface AuthenticateData {
  user: Partial<User>;
  token: string;
}
