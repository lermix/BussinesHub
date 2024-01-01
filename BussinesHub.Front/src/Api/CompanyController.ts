import { Company } from '../Models/Company';
import { requests } from './agent';
import { Product } from '../Models/Product';
import { Category } from '../Models/Category';
import { promises } from 'dns';

export const ApiCompany = {
	createCompany: (company: Company, username: string): Promise<Company> => requests.post(`Company/CreateCompany?username=${username}`, company),
	EditCompany: (company: Company): Promise<Company> => requests.post(`Company/EditCompany`, company),
	getCompanyProducts: (companyId: number): Promise<Product[]> => requests.get(`Company/GetCompanyProducts?companyId=${companyId}`),
	getCompanyCategories: (companyId: number): Promise<Category[]> => requests.get(`Company/GetCompanyCategories?companyId=${companyId}`),
	createCompanyCategory: (category: Category, companyId: number): Promise<Category> =>
		requests.post(`Company/CreateCompanyCategory?companyId=${companyId}`, category),
};
