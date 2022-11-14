import { requests } from "../agent";
import * as actionTypes from "./actionTypes";
import { ThunkAction } from "redux-thunk";
import { AppState } from "../rootReducer";
import { Action } from "redux";
import { turnOffLoading, turnOnLoading } from "../shared/actions";
import { Store } from "../../models/Store";
import { Company } from "../../models/Company";
import { Product } from "../../models/Product";
import { IStoreActionType } from "./interfaces";

const apiActions = {
  getStoreProducts: (storeId: number): Promise<Product[]> =>
    requests.get(`Store/GetStoreProduct?storeId=${storeId}`),
  createProduct: (storeId: number, product: Product): Promise<Product> =>
    requests.post(`Store/AddProductToStore?storeId=${storeId}`, product),
};

export const getStoreProducts =
  (storeId: number): ThunkAction<void, AppState, unknown, Action<string>> =>
  async (dispatch) => {
    try {
      dispatch(turnOnLoading());
      dispatch(
        getStoreProductsSuccess(await apiActions.getStoreProducts(storeId))
      );
      dispatch(turnOffLoading());
    } catch (error) {
      console.error(error);
      dispatch(turnOffLoading());
    }

    function getStoreProductsSuccess(products: Product[]): IStoreActionType {
      return {
        type: actionTypes.GET_STORE_PRODUCTS,
        products: products,
      };
    }
  };

export const createProduct =
  (
    storeId: number,
    product: Product
  ): ThunkAction<void, AppState, unknown, Action<string>> =>
  async (dispatch) => {
    try {
      dispatch(turnOnLoading());
      dispatch(
        createProductSuccess(await apiActions.createProduct(storeId, product))
      );
      dispatch(turnOffLoading());
    } catch (error) {
      console.error(error);
      dispatch(turnOffLoading());
    }

    function createProductSuccess(product: Product): IStoreActionType {
      return {
        type: actionTypes.CREATE_STORE_PRODUCT,
        product: product,
      };
    }
  };
export const setSelectedStore =
  (store: Store): ThunkAction<void, AppState, unknown, Action<string>> =>
  async (dispatch) => {
    try {
      dispatch(setSelectedStoreSuccess(store));
    } catch (error) {
      console.error(error);
    }

    function setSelectedStoreSuccess(store: Store): IStoreActionType {
      return {
        type: actionTypes.SET_SELECTED_STORE,
        store: store,
      };
    }
  };
