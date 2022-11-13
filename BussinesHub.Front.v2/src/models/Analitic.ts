import { Company } from "./Company";
import { Product } from "./Product";
import { VerifiedUser } from "./User";

export interface Analitic {
  id: number;
  company: Company;
  product: Product | null;
  isView: boolean;
  isRegisterdUser: boolean;
  user: VerifiedUser | null;
  date: string;
  country: string;
  city: string;
  region: string;
  longitude: number;
  latitude: number;
}
