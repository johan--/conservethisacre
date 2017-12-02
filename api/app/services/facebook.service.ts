import { environment } from '../../environments/environment';
import { get } from 'request';
import { promisify } from 'bluebird';

const getAsync = promisify(get);

export interface FacebookUserCredentials {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
}

export class FacebookService {

  AppID: string = environment.facebook.appId;

  APIVersion: string = environment.facebook.apiVersion || 'v2.9'
  APIBaseURL: string = environment.facebook.apiURL;
  AppSecret: string = environment.facebook.appSecret;

  USER_CREDENTIALS = `${this.APIBaseURL}/${this.APIVersion}/me`;

  /**
   * Async Static Gets User credentails in order to place it further
   *
   * @static
   * @param {string} accessToken
   * @param {Array<string>} [fields=Facebook.UserFields]
   * @returns {Promise<Object>}
   *
   * @memberof Facebook
   */
  GetUserCredentials(accessToken: string): Promise<FacebookUserCredentials> {
    return getAsync({
      url: this.USER_CREDENTIALS,
      qs: {access_token: accessToken, fields: 'email,first_name,last_name'},
      json: true
    })
      .then(res => res.statusCode == 200 ? res.body : null);
  }
}
