import { User } from '../../core/models/user';

export interface AuthenticateData {
  user: User;
  token: string;
}
