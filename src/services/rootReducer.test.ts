import { expect } from '@jest/globals';
import rootReducer from './rootReducer';
import { initialState as ingredientsState } from './Slices/IngredientsSlice';
import { initialState as feedsState } from './Slices/feedSlice';
import { initialState as constructorState } from './Slices/constructorSlice';
import { initialState as userState } from './Slices//userSlice';
import { initialState as orderListState } from './Slices/orderListSlice';
import { initialState as orderState } from './Slices/orderSlice';

// Состояние редьюсера каким оно должно быть
const testState = {
  ingredients: ingredientsState,
  feeds: feedsState,
  constructorBurger: constructorState,
  userInfo: userState,
  orderList: orderListState,
  order: orderState
};

// Проверка инициализации состояния корневого редьюсера
describe('Тестирование инициализации корневого редьюсера', () => {
  test('Тест редьюсера', () => {
    const action = { type: 'UNKNOWN_ACTION' };
    const newState = rootReducer(undefined, action);
    expect(newState).toStrictEqual(testState);
  });
});
