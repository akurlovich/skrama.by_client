import React, { FC, useState } from 'react';
import './productitem.scss';
// @ts-ignore
import itemImage from '../../../assets/img/parnichok3.jpg';
import { IProductResponse } from '../../../types/IProductResponse';
import { IProductInfoResponse } from '../../../types/IProductInfoResponse';
import { useNavigate } from 'react-router-dom';
import { SERVER_URL } from '../../../constants/http';
import { DEFAULT_TYPE_ID_POLIK_KREPEZH } from '../../../constants/user';
import ProductService from '../../../services/ProductService';
import { addItem } from '../../../store/reducers/CartReducer/CartSlice';
import { useAppDispatch } from '../../../hooks/redux';
import { ICartItem } from '../../../types/ICartItem';
import { SuccessModal } from '../../UI/SuccessModal/SuccessModal';
import { smoothScroll } from '../../../services/ClientServices/SmothScroll';

interface IProps {
  item: IProductResponse;
  productsInfo: IProductInfoResponse[];
}

const ProductItemInner: FC <IProps> = ({item, productsInfo}) => {
  const price = item.price.toFixed(2);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const foundProductInfo = productsInfo.filter(i => i.productID === item._id);
  const [successModal, setSuccessModal] = useState(false);

  const clickHandler = async () => {
    // navigate(`/polikarbonat/${item._id}`);
    navigate(`/shtaketnik/${item._id}`);
    await ProductService.updateProductPriceByID({id: item._id, views: item.views + 1});
  };

  const itemForOrder = () => {
    let thickness = '';
    let density = '';
    let size = '';
    for (const element of foundProductInfo) {
      switch (element.title) {
        case 'Плотность':
          density = element.description;
          break;
        case 'Толщина':
          thickness = element.description;
          break;
        case 'Размер листа':
          size = element.description;
          break;
      }
    }
    const itemCart: ICartItem = {
      id: item._id,
      title: item.name,
      price: item.price,
      imageUrl: SERVER_URL + item.coverImage,
      color: 'Прозрачный',
      thickness,
      density,
      size,
      count: 1,
    };
    return itemCart;
  };

  const addToCartHandler = () => {
    // smoothScroll();
    const item = itemForOrder();
    dispatch(addItem(item));
    setSuccessModal(true);
  };

  const closeModalWindow = () => {
    setSuccessModal(false);
  };

  return (
    <>
      {successModal && 
        <SuccessModal
          title='Товар добавлен в корзину!'
          closeModal={closeModalWindow}
        />
      }
      <div className="productitem__item"
        // onClick={clickHandler}
        >
        <div className="productitem__item__image" onClick={clickHandler}>
          {item._id === '63ff49791ef9e0bf73a48519' && 
            <span className='productitem__item__image_span'>Хит</span>
          }
          {item._id === '63ff49bc1ef9e0bf73a48521' && 
            <span className='productitem__item__image_span'>Хит</span>
          }
          <img className="productitem__item__image_img" src={SERVER_URL + item.coverImage} alt="parnichok" />
        </div>
        <div className="productitem__item__info" onClick={clickHandler}>
          <div className="productitem__item__title">
            {item.name}
          </div>
          <div className="productitem__item__description">
            {foundProductInfo.map(item => (
              <div key={item._id} className="productitem__item__text">
                <div className="productitem__item__text__main">
                  {item.title}: 
                </div>
                <div className="productitem__item__text__ssecondary">
                  {item.description}
                </div>
              </div>

            ))}



            {item.typeID === DEFAULT_TYPE_ID_POLIK_KREPEZH ? null :
              <div className="productitem__item__text">
                Цвет: прозрачный
              </div>
            }

          </div>
          <div className="productitem__item__price">
            {price} руб
          </div>
        </div>
        <div 
          onClick={addToCartHandler}
          className="productitem__cart">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" viewBox="0 0 512 512"><title/><g data-name="1" id="_1"><path fill="#fff" d="M397.78,316H192.65A15,15,0,0,1,178,304.33L143.46,153.85a15,15,0,0,1,14.62-18.36H432.35A15,15,0,0,1,447,153.85L412.4,304.33A15,15,0,0,1,397.78,316ZM204.59,286H385.84l27.67-120.48H176.91Z"/><path fill="#fff" d="M222,450a57.48,57.48,0,1,1,57.48-57.48A57.54,57.54,0,0,1,222,450Zm0-84.95a27.48,27.48,0,1,0,27.48,27.47A27.5,27.5,0,0,0,222,365.05Z"/><path fill="#fff" d="M368.42,450a57.48,57.48,0,1,1,57.48-57.48A57.54,57.54,0,0,1,368.42,450Zm0-84.95a27.48,27.48,0,1,0,27.48,27.47A27.5,27.5,0,0,0,368.42,365.05Z"/><path fill="#fff" d="M158.08,165.49a15,15,0,0,1-14.23-10.26L118.14,78H70.7a15,15,0,1,1,0-30H129a15,15,0,0,1,14.23,10.26l29.13,87.49a15,15,0,0,1-14.23,19.74Z"/></g></svg>

          <div className="productitem__cart_btn">В корзину</div>
        </div>
      </div>
    </>
  )
}

export const ProductItem = React.memo(ProductItemInner);