import { sign } from 'jsonwebtoken';
import { createHash } from 'crypto';

const SECRET_KEY = 'ts3A2jF2BUZMDthgaQyIy7CxbvH5YisrW0vuPUR7';

export class AuthService {

    /**
     * Signs in user with given username and password
     * @param username
     * @param password
     */
    // public async signin(username, password): Promise<AuthenticateData> {
    //     const userModel = await User.findOne({username});
    //
    //     // Check exists
    //     if (!userModel) {
    //         return null;
    //     }
    //
    //     const user = userModel.toJSON() as IUser;
    //
    //     // Check password
    //     const encodedPassword = this.encode(password, user.salt);
    //     if (encodedPassword != user.password) {
    //         return null;
    //     }
    //
    //     const token = sign({userId: userModel._id}, SECRET_KEY);
    //
    //     delete user.password;
    //     delete user.salt;
    //
    //     await Token.remove({user: user});
    //     await new Token({user: user, token: token}).save();
    //
    //     return {user: user, token};
    // }

    /**
     * Verifies token and returns authenticate data if token exists
     * @param username
     * @param password
     */
    // public async verify(token: string): Promise<AuthenticateData> {
    //     const tokenModel = await Token.findOne({token: token}).populate('user');
    //     if(!tokenModel){
    //         return ;
    //     }
    //
    //     const user = tokenModel.get('user');
    //
    //     return {user, token};
    // }

    /**
     * Encodes password using sha 256
     */
    private encode(pwd: string, salt: string) {
        return createHash('sha256').update(pwd + ':' + salt).digest('hex');
    }
}
