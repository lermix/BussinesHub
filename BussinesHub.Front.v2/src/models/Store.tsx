import { Company } from "./Company";
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
