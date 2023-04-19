import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from './reducers/UserReducer/UserSlice';
import authReducer from './reducers/AuthReducer/AuthSlice';
import productReducer from './reducers/ProductReducer/ProductSlice';

import filterReducer from "./reducers/FilterReducer/FilterSlice";
import brandReducer from "./reducers/BrandReducer/BrandSlice";
import typeReducer from "./reducers/TypeReducer/TypeSlice";
import navigationBarReducer from './reducers/NavigationBarReducer/NavigationBarSlice';

import cartReducer from "./reducers/CartReducer/CartSlice";
import colorsReducer from './reducers/ColorReducer/ColorSlice';

const rootReducer = combineReducers({
  userReducer,
  authReducer,
  // bookReducer,
  // bookedReducer,
  // issuedReducer,
  // commentReducer,

  productReducer,
  filterReducer,
  brandReducer,
  typeReducer,
  cartReducer,
  navigationBarReducer,
  colorsReducer,
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']