import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { RootState } from 'src/services/store';
import { useNavigate } from 'react-router-dom';
import { clearOrder, orderBurger } from '../../services/Slices/orderSlice'

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const constructorItems = useSelector((state) => state.constructorBurger)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isAuth = useSelector((state) => state.userInfo.isAuthChecked)
  let order: string[] = []

  const orderRequest = false;

  const orderModalData = null;

  const onOrderClick = () => {
    if(!isAuth){
      navigate("/login")
    } else if (constructorItems.bun && constructorItems.ingredients){
      order = [
        constructorItems.bun._id,
        ...constructorItems.ingredients.map((ingredient) => ingredient._id),
        constructorItems.bun._id
      ]
      dispatch(orderBurger(order))
    }
  };
  const closeOrderModal = () => {
    dispatch(clearOrder());
    navigate('/');
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  /* return null; */

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
