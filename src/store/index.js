
import { applyMiddleware, createStore } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import rootReducer from "../reducers"
import whitelist from "./whitelist";

import { composeWithDevTools } from "redux-devtools-extension";
import reduxThunk from "redux-thunk";

const persistConfig = {
  timeout: 90000,
  whitelist,
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  undefined,
  composeWithDevTools(applyMiddleware(...[thunk, reduxThunk]))
);

export const persistor = persistStore(store, {}, () => {});
