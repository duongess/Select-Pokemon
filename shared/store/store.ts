import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { createLogger } from "redux-logger";
import { rootSaga } from "./root-saga";
import { rootReducer } from "./root-reducer";

// Check if window object is available (client-side)
const isClient = typeof window !== "undefined";

const sagaMiddleware = createSagaMiddleware();

// Configure redux-logger
// Configure redux-logger with more detailed options
const logger = createLogger({
  // Don't collapse actions in console
  collapsed: false,
  // Log all actions
  predicate: () => true,
  // Colors for different action types
  colors: {
    title: () => "#3674B5",
    prevState: () => "#9E9E9E",
    action: () => "#03A9F4",
    nextState: () => "#4CAF50",
    error: () => "#F20404",
  },
  // Log duration of actions
  duration: true,
  // Log timestamp
  timestamp: true,
  // Log the full action
  diff: true,
});

const makeStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: false,
        serializableCheck: {
          // Ignore these action types
          ignoredActions: ["persist/PERSIST"],
        },
      })
        .concat(sagaMiddleware)
        .concat(logger), // Add logger middleware
    devTools: isClient && process.env.NODE_ENV !== "production",
  });

  sagaMiddleware.run(rootSaga);

  return store;
};

// Create store only on client side
export const store = isClient ? makeStore() : null;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store extends null
  ? never
  : ReturnType<typeof makeStore>["dispatch"];
