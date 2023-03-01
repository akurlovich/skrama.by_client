import React, { FC, useState } from 'react';
import './productupdate.scss';
import { TextField } from '@fluentui/react/lib/TextField';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import ProductService from '../../../services/ProductService';
import { getProductByID, getProductInfoByProductID } from '../../../store/reducers/ProductReducer/ProductActionCreators';
import { Loader } from '../../UI/Loader/Loader';

interface IProps {
  closeModal: (bol: boolean) => void;
  productID: string;
  productPrice: number;
}

const ProductUpdateInner: FC<IProps> = ({closeModal, productID, productPrice}) => {
  const { error, isLoading } = useAppSelector(state => state.productReducer);
  const [newPrice, setNewPrice] = useState(productPrice.toString());
  const dispatch = useAppDispatch();
  
  const nameHandler = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
    setNewPrice(newValue || '');
  };

  const confirmHandler = async () => {
    await ProductService.updateProductPriceByID({id: productID, price: +newPrice});
    await dispatch(getProductInfoByProductID(productID));
    await dispatch(getProductByID(productID));
    if (error) {
      alert(error);
      closeModal(false);
      return
    }
    alert('Цена изменена!');
    
    closeModal(false);
  };

  return (
    <>
      {isLoading && <Loader/>}
      <div className='productupdate__wrapper'>
        <div className="productupdate__container">
          <div className="productupdate__title">
            Введите новую цену
          </div>
          <div className="productupdate__inputs">
            <TextField 
              value={newPrice}
              onChange={nameHandler}
              label="Новая цена:" 
              required
              underlined 
              size={100}
            />
          </div>
          <div className="productupdate__buttons">
            <button
              onClick={() => closeModal(false)} 
              className="btn btn-secondary btn-lg">
              Отмена
            </button>
            <button
              onClick={confirmHandler}
              className="btn btn-primary btn-lg">
              Подтвердить
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export const ProductUpdate = React.memo(ProductUpdateInner);