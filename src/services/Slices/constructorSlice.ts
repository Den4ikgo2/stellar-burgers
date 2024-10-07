import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

// Тип начального состояния
type TConstructorState = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
};

// Начальное состояние
export const initialState: TConstructorState = {
  bun: null,
  ingredients: []
};

// Создание слайса
export const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addInBasketIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      state.ingredients.push(action.payload);
    },
    addInBasketBun: (state, action: PayloadAction<TConstructorIngredient>) => {
      state.bun = action.payload;
    },
    deleteBasketIngredient: (state, action: PayloadAction<number>) => {
      state.ingredients.splice(action.payload, 1);
    },
    moveBasketIngredient: (
      state,
      action: PayloadAction<{ fromIngredient: number; toIngredient: number }>
    ) => {
      const { fromIngredient, toIngredient } = action.payload;
      const [removed] = state.ingredients.splice(fromIngredient, 1);
      state.ingredients.splice(toIngredient, 0, removed);
    },
    clearBurgerConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  }
});

export const {
  addInBasketIngredient,
  addInBasketBun,
  deleteBasketIngredient,
  moveBasketIngredient,
  clearBurgerConstructor
} = constructorSlice.actions;
