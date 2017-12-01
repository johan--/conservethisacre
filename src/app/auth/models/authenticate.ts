import { User } from '../../core/models/user';

export interface AuthenticateParams {
  email: string;
  password: string;
}

export interface AuthenticateData {
  user: Partial<User>;
  token: string;
}
