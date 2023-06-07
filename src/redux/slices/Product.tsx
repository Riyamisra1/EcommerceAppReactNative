import {product} from '../../interface/ProductDataType';
import {createSlice} from '@reduxjs/toolkit';
const ProductSlice = createSlice({
  name: 'products',
  initialState: {
    data: null,
    isLoading: false,
  },
  reducers: {
    addProducts(state: {data: product[] | null}, action: {payload: product[]}) {
      state.data = action.payload;
    },
  },
});

export const {addProducts} = ProductSlice.actions;
export default ProductSlice.reducer;
