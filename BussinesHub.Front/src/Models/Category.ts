import { Product } from "./Product";

export interface Category {
  id: number;
  name: string;
  parent: Category | null;
  children: Category[] | null;
  products: Product[];
}
