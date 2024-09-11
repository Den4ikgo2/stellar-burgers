import { getFeedsApi} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrdersData } from '@utils-types';

// Сделаем асинхронный экшен
export const getFeeds = createAsyncThunk(
  'ingredients/getFeeds',
  async () => getFeedsApi()
);

// Типизация и создание начального состояния
type TFeedsState = {
  feeds: TOrdersData;
  loading: boolean;
  error: string | null | undefined;
};

const initialState: TFeedsState = {
  feeds: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  loading: false,
  error: null
};

// Создание слайса
export const feedsSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.loading = false;
        state.feeds = action.payload;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.loading = true;
        state.error = action.error.message;
      });
  }
});
