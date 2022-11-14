import { Company } from "../../models/Company";
import { Product } from "../../models/Product";
import { Store } from "../../models/Store";
import * as actionTypes from "./actionTypes";

// STATE
export interface IStoreState {
  selectedStore: Store | null;
}
interface IGetStoreProdutcs {
  type: typeof actionTypes.GET_STORE_PRODUCTS;
  products: Product[];
}

interface ISetSelectedStore {
  type: typeof actionTypes.SET_SELECTED_STORE;
  store: Store;
}

interface ICreateStoreProduct {
  type: typeof actionTypes.CREATE_STORE_PRODUCT;
  product: Product;
}

export type IStoreActionType =
  | ISetSelectedStore
  | IGetStoreProdutcs
  | ICreateStoreProduct;
