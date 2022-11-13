import { combineReducers } from "redux";
import { sharedReducer } from "./shared/reducer";
import { userReducer } from "./user/reducer";

export const rootReducer = combineReducers({
  shared: sharedReducer,
  user: userReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
