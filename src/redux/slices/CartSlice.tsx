import {product} from '../../interface/ProductDataType';
import {createSlice} from '@reduxjs/toolkit';
const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    data: [],
  },
  reducers: {
    addItemToCart(state: {data: product[]}, action: {payload: product}) {
      let temporaryData = state.data ? state.data : [];
      let isItemExist = false;
      temporaryData.map(item => {
        if (item.id === action.payload.id) {
          isItemExist = true;
          item.quantity = item.quantity + 1;
        }
      });
      if (!isItemExist) {
        temporaryData.push(action.payload);
      }
      state.data = temporaryData;
    },
    reduceItemFromCart(state: {data: product[]}, action: {payload: product}) {
      let temporaryData = state.data;
      temporaryData.map(item => {
        if (item.id === action.payload.id) {
          if (item.quantity > 1) {
            item.quantity = item.quantity - 1;
          }
        }
      });
    },
    removeItemFromCart(state: {data: product[]}, action: {payload: number}) {
      let temporaryData = state.data;
      temporaryData.splice(action.payload, 1);
      state.data = temporaryData;
    },
    emptyCart(state: {data: product[]}, action: {payload: product[]}) {
      state.data = action.payload;
    },
    updateCart(state: {data: product[]}, action: {payload: product[]}) {
      state.data = action.payload;
    },
  },
});

export const {
  addItemToCart,
  reduceItemFromCart,
  removeItemFromCart,
  emptyCart,
  updateCart,
} = CartSlice.actions;
export default CartSlice.reducer;
