export interface EmailPasswordCredentials {
  email: string;
  password: string;
}

export interface FacebookCredentials {
  accessToken: string;
}

export type Creadentials = EmailPasswordCredentials | FacebookCredentials;
