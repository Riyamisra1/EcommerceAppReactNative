import {address} from '../../interface/addressType';
import {createSlice} from '@reduxjs/toolkit';
const AddressSlice = createSlice({
  name: 'address',
  initialState: {
    data: [],
  },
  reducers: {
    addAddress(state: {data: address[]}, action: {payload: address}) {
      state.data = state.data ? state.data : [];
      state.data.push(action.payload);
    },
    deleteAddress(state: {data: address[]}, action: {payload: number}) {
      let temporaryData = state.data ? state.data : [];
      temporaryData.splice(action.payload, 1);
      state.data = temporaryData;
    },
    updateAddress(state: {data: address[]}, action: {payload: address}) {
      let temporaryData = state.data ? state.data : [];
      temporaryData.map(item => {
        if (item.id === action.payload.id) {
          item.state = action.payload.state;
          item.city = action.payload.city;
          item.pincode = action.payload.pincode;
          item.addressType = action.payload.addressType;
        }
      });
      state.data = temporaryData;
    },
    emptyAddress(state: {data: address[]}, action: {payload: address[]}) {
      state.data = action.payload;
    },
    updatePreviousAddress(
      state: {data: address[]},
      action: {payload: address[]},
    ) {
      state.data = action.payload;
    },
  },
});

export const {
  addAddress,
  deleteAddress,
  updateAddress,
  emptyAddress,
  updatePreviousAddress,
} = AddressSlice.actions;
export default AddressSlice.reducer;
