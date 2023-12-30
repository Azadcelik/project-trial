import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from "redux";

import thunk from "redux-thunk";
import sessionReducer from "./session";
import getProductReducer from "./product";
import favoriteReducer from "./favorite";
import newReviewReducer from "./review";
import shoppingCartReducer from "./shoppingCart";
import addProductImageReducer from "./productImage";

const rootReducer = combineReducers({
  session: sessionReducer,
  products: getProductReducer,
  favorites: favoriteReducer,
  reviews: newReviewReducer,
  shoppingCart: shoppingCartReducer,
  productImage: addProductImageReducer
});

let enhancer;
if (import.meta.env.MODE === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
