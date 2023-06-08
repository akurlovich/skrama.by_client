import React, { FC, useEffect } from 'react';
import { SERVER_URL } from '../../../constants/http';
import { DEFAULT_TYPE_ID_POLIKARBONAT, DEFAULT_TYPE_ID_SHTAKETNIK } from '../../../constants/user';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { addItem, minusItem, removeItem } from '../../../store/reducers/CartReducer/CartSlice';
import { getProductByID, getProductInfoByProductID } from '../../../store/reducers/ProductReducer/ProductActionCreators';
import { ICartItem } from '../../../types/ICartItem';

const CartItem: FC<ICartItem> = ({
  id,
  typeID,
  title,
  price,
  imageUrl,
  color,
  thickness,
  density,
  size,
  count,
}) => {
  // const { product, productInfo, isLoading } = useAppSelector(state => state.productReducer);
  const { items, totalPrice } = useAppSelector(state => state.cartReducer);
  const dispatch = useAppDispatch();

  const onClickPlus = () => {
    const item: ICartItem = {
      id,
      typeID,
      title,
      price,
      imageUrl,
      color,
      thickness,
      density,
      size,
      count: 1,
    };
    dispatch(addItem(item))
  };

  const onClickMinus = () => {
    dispatch(minusItem({id, price}));
  };

  const onClickRemove = () => {
    dispatch(removeItem({id, price: +((price * count).toFixed(2))}));
  };

  return (
    <div className="cart__item">
      <div className="cart__item-img">
        <img className="pizza-block__image" src={imageUrl} alt="Поликарбонат" />
      </div>
      <div className="cart__item-info">
        <h3>{title}</h3>
        {typeID  === DEFAULT_TYPE_ID_POLIKARBONAT && 
          <div className="cart__item-info__description">
            <div className="cart__item-info__description__item">
              Толщина: {thickness}
            </div>
            <div className="cart__item-info__description__item">
              Плотность: {density}
            </div>
            <div className="cart__item-info__description__item">
              Размер листа: {size}
            </div>
            <div className="cart__item-info__description__item">
              Цвет: {color}
            </div>
          </div>
        }
        {typeID  === DEFAULT_TYPE_ID_SHTAKETNIK && 
          <div className="cart__item-info__description">
            <div className="cart__item-info__description__item">
              Вид покрытия: {density}
            </div>
            <div className="cart__item-info__description__item">
              Стороны покрытия: {thickness}
            </div>
            <div className="cart__item-info__description__item">
              Длинна 1 шт., мм: {size}
            </div>
            <div className="cart__item-info__description__item">
              Цвет: {color}
            </div>
          </div>
        }
        
      </div>
      <div className="cart__item-count">
        <button
          disabled={count === 1}
          onClick={onClickMinus}
          className="button button--outline button--circle cart__item-count-minus">
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
              fill="#EB5A1E"></path>
            <path
              d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
              fill="#EB5A1E"></path>
          </svg>
        </button>
        <b>{count}</b>
        <button
          onClick={onClickPlus}
          className="button button--outline button--circle cart__item-count-plus">
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
              fill="#EB5A1E"></path>
            <path
              d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
              fill="#EB5A1E"></path>
          </svg>
        </button>
      </div>
      <div className="cart__item-price">
        <b>{(price * count).toFixed(2)} руб</b>
      </div>
      <div className="cart__item-remove">
        <div 
          onClick={onClickRemove}
          className="button button--outline button--circle">
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
              fill="#EB5A1E"></path>
            <path
              d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
              fill="#EB5A1E"></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
