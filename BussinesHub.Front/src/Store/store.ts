import { rootReducer } from "./rootReducer";
import frontendSettings from "../../frontendSettings";
import { AnyAction, configureStore, ThunkDispatch } from "@reduxjs/toolkit";

function SetUpStore() {
  if (frontendSettings.IsProduction)
    return configureStore({
      reducer: rootReducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
          immutableCheck: false,
        }),
    });
  else
    return configureStore({
      reducer: rootReducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
          immutableCheck: false,
        }),
      devTools: true,
    });
}

export const store = SetUpStore();

export type RootState = ReturnType<typeof store.getState>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AppDispatch = ThunkDispatch<RootState, any, AnyAction>;
