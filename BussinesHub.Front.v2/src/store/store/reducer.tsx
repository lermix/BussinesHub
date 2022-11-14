import * as actionTypes from "./actionTypes";
import { IStoreActionType, IStoreState } from "./interfaces";

const initialState: IStoreState = {
  selectedStore: null,
};

export function storeReducer(
  state: IStoreState = initialState,
  action: IStoreActionType
): IStoreState {
  switch (action.type) {
    case actionTypes.SET_SELECTED_STORE:
      return {
        ...state,
        selectedStore: action.store,
      };
    case actionTypes.GET_STORE_PRODUCTS:
      if (state.selectedStore) {
        return {
          ...state,
          selectedStore: {
            ...state.selectedStore,
            products: action.products,
          },
        };
      } else
        return {
          ...state,
        };
    case actionTypes.CREATE_STORE_PRODUCT:
      if (state.selectedStore && state.selectedStore?.products) {
        return {
          ...state,
          selectedStore: {
            ...state.selectedStore,
            products: [...state.selectedStore.products, action.product],
          },
        };
      } else if (state.selectedStore) {
        return {
          ...state,
          selectedStore: {
            ...state.selectedStore,
            products: [action.product],
          },
        };
      }

    default:
      return state;
  }
}
