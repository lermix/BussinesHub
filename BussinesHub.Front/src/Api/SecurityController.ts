import { LoginDto, User } from '../Models/User';
import { requests } from './agent';

export const ApiSecurity = {
	Login: (loginDto: LoginDto): Promise<User> => requests.post(`Security/Login`, loginDto),
};
