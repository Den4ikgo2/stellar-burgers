import { combineReducers } from '@reduxjs/toolkit';
import { ingredientSlice } from './Slices/IngredientsSlice';
import { feedsSlice } from './Slices/feedSlice';
import { constructorSlice } from './Slices/constructorSlice';
import { userSlice } from './Slices/userSlice';
import { orderListSlice } from './Slices/orderListSlice';

// Корневой редьюсер с комбайном
const rootReducer = combineReducers({
  ingredients: ingredientSlice.reducer,
  feeds: feedsSlice.reducer,
  constructorBurger: constructorSlice.reducer,
  userInfo: userSlice.reducer,
  orderList: orderListSlice.reducer
});

export default rootReducer;
