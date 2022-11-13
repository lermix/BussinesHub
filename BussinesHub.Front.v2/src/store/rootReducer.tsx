import { useReducer } from "react";
import { combineReducers } from "redux";
import { sharedReducer } from "./shared/reducer";

export const rootReducer = combineReducers({
  shared: sharedReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
