import {configureStore} from '@reduxjs/toolkit';
import ProductReducer from '../redux/slices/Product';
import WishListReducer from '../redux/slices/Wishlist';
import CartReducer from '../redux/slices/CartSlice';
import UserReducer from '../redux/slices/User';
import {persistStore, persistReducer} from 'redux-persist';
import {combineReducers} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AddressReducer from '../redux/slices/Address';
import OderReducer from '../redux/slices/OrderSlice';
const rootReducer = combineReducers({
  product: ProductReducer,
  wishList: WishListReducer,
  cart: CartReducer,
  user: UserReducer,
  address: AddressReducer,
  order: OderReducer,
});
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (
    getDefaultMiddleware: (arg0: {serializableCheck: boolean}) => any,
  ) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export const persistor = persistStore(store);
