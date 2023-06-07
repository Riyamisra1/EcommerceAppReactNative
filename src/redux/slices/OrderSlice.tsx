import {orderType} from '../../interface/OrderType';
import {createSlice} from '@reduxjs/toolkit';

const OrderSlice = createSlice({
  name: 'order',
  initialState: {
    data: [],
  },
  reducers: {
    orderItem(state: {data: orderType[]}, action: {payload: orderType}) {
      state.data = state.data ? state.data : [];
      state.data.push(action.payload);
    },
    emptyOrder(state: {data: orderType[]}, action: {payload: orderType[]}) {
      state.data = action.payload;
    },
    updateOrder(state: {data: orderType[]}, action: {payload: orderType[]}) {
      state.data = action.payload;
    },
  },
});

export const {orderItem, emptyOrder, updateOrder} = OrderSlice.actions;
export default OrderSlice.reducer;
