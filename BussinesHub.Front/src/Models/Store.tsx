import { Company, CompanyClass } from "./Company";
import { Image } from "./Image";
import { Product } from "./Product";

export interface Store {
  id: number;
  name: string;
  adress: string;
  city: string;
  postalCode: string;
  country: string;
  mobileNumber: string | null;
  parentCompany: Company;
  images: Image[];
  products: Product[];
}

export class StoreClass implements Store {
  id = 0;
  name = "";
  adress = "";
  city = "";
  postalCode = "";
  country = "";
  mobileNumber = "";
  parentCompany = new CompanyClass();
  images = [];
  products = [];
}
