import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch } from '../../services/store';
import {
  deleteBasketIngredient,
  moveBasketIngredient
} from '../../services/Slices/constructorSlice';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();

    const handleMoveDown = () => {
      dispatch(
        moveBasketIngredient({ fromIngredient: index, toIngredient: index + 1 })
      );
    };

    const handleMoveUp = () => {
      dispatch(
        moveBasketIngredient({ fromIngredient: index, toIngredient: index - 1 })
      );
    };

    const handleClose = () => {
      dispatch(deleteBasketIngredient(index));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
