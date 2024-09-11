import { getOrdersApi } from '../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type OrderList = {
  orders: TOrder[];
};

export const getOrderList = createAsyncThunk(
  'order/getOrderList',
  getOrdersApi
);

const initialState: OrderList = {
  orders: []
};

export const orderListSlice = createSlice({
  name: 'orderListSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOrderList.fulfilled, (state, action) => {
        state.orders = action.payload
    })
  }
});
