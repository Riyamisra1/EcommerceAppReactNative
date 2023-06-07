import {userData} from '../../interface/ProductDataType';
import {createSlice} from '@reduxjs/toolkit';
const UserSlice = createSlice({
  name: 'user',
  initialState: {
    data: null,
  },
  reducers: {
    addUserToStore(
      state: {data: userData | null},
      action: {payload: userData},
    ) {
      state.data = action.payload;
    },
  },
});

export const {addUserToStore} = UserSlice.actions;
export default UserSlice.reducer;
