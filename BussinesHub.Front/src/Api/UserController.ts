import { Company } from '../Models/Company';
import { requests } from './agent';

export const ApiUser = {
	GetUserCompanies: (username: string): Promise<Company[]> => requests.get(`User/GetUserCompanies?username=${username}`),
	SetUserCompany: (username: string, companyId: number): Promise<Company> =>
		requests.get(`User/SetUserCompany?username=${username}&comapnyId=${companyId}`),
};
