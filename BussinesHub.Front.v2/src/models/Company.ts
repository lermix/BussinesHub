import { Store } from "./Store";
import { Analitic } from "./Analitic";

export interface Company {
  id: number;
  name: string;
  identificationNumber: string;
  adress: string;
  city: string;
  postalCode: string;
  country: string;
  phoneNumber: string;
}

export class CompanyClass implements Company {
  id = 0;
  name = "";
  identificationNumber = "";
  adress = "";
  city = "";
  postalCode = "";
  country = "";
  phoneNumber = "";
}
