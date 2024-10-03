import { expect } from '@jest/globals';
import {
  initialState,
  getIngredients,
  ingredientSlice
} from './IngredientsSlice';
import { ingredientsData } from './dataForTest';

describe('Тестирование редьюсера ингредиентов', () => {
  const arrayIngredients = [
    {
      success: true,
      data: ingredientsData
    }
  ];

  test('Тестирование pending', () => {
    const pending = {
      ...initialState,
      error: null,
      loading: true
    };

    const action = {
      type: getIngredients.pending.type,
      payload: arrayIngredients
    };

    const ingredientsState = ingredientSlice.reducer(initialState, action);
    expect(ingredientsState).toStrictEqual(pending);
  });
  test('Тестирование fulfiled', () => {
    const fulfilled = {
      ...initialState,
      ingredients: arrayIngredients,
      error: null,
      loading: false
    };

    const action = {
      type: getIngredients.fulfilled.type,
      payload: arrayIngredients
    };

    const ingredientsState = ingredientSlice.reducer(initialState, action);
    expect(ingredientsState).toStrictEqual(fulfilled);
  });
  test('Тестирование rejected', () => {
    const rejected = {
      ...initialState,
      error: 'Ошибка загрузки',
      loading: false
    };

    const action = {
      type: getIngredients.rejected.type,
      error: { message: 'Ошибка загрузки' }
    };

    const ingredientsState = ingredientSlice.reducer(initialState, action);
    expect(ingredientsState).toStrictEqual(rejected);
  });
});
