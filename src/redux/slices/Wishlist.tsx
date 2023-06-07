import {product} from '../../interface/ProductDataType';
import {createSlice} from '@reduxjs/toolkit';
const WishListSlice = createSlice({
  name: 'wishList',
  initialState: {
    data: [],
  },
  reducers: {
    addItemTowishList(state: {data: product[]}, action: {payload: product}) {
      let temporaryData = state.data ? state.data : [];
      let isItemExist = false;
      temporaryData.map(item => {
        if (item.id === action.payload.id) {
          isItemExist = true;
        }
      });
      if (!isItemExist) {
        temporaryData.push(action.payload);
      }
      state.data = temporaryData;
    },
    removeItemFromWishList(
      state: {data: product[]},
      action: {payload: number},
    ) {
      let temporaryData = state.data ? state.data : [];
      temporaryData.splice(action.payload, 1);
      state.data = temporaryData;
    },
    emptyWishList(state: {data: product[]}, action: {payload: product[]}) {
      state.data = action.payload;
    },
    updateWishList(state: {data: product[]}, action: {payload: product[]}) {
      state.data = action.payload;
    },
  },
});

export const {
  addItemTowishList,
  removeItemFromWishList,
  emptyWishList,
  updateWishList,
} = WishListSlice.actions;
export default WishListSlice.reducer;
