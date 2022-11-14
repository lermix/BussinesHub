import { combineReducers } from "redux";
import { companyReducer } from "./company/reducer";
import { sharedReducer } from "./shared/reducer";
import { storeReducer } from "./store/reducer";
import { userReducer } from "./user/reducer";

export const rootReducer = combineReducers({
  shared: sharedReducer,
  user: userReducer,
  company: companyReducer,
  store: storeReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
