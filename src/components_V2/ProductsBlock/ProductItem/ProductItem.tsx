import React, { FC } from 'react';
import './productitem.scss';
// @ts-ignore
import itemImage from '../../../assets/img/parnichok3.jpg'
import { IProductResponse } from '../../../types/IProductResponse';
import { IProductInfoResponse } from '../../../types/IProductInfoResponse';
import { useNavigate } from 'react-router-dom';
import { SERVER_URL } from '../../../constants/http';
import { DEFAULT_TYPE_ID_POLIK_KREPEZH } from '../../../constants/user';
import ProductService from '../../../services/ProductService';

interface IProps {
  item: IProductResponse;
  productsInfo: IProductInfoResponse[];
}

const ProductItemInner: FC <IProps> = ({item, productsInfo}) => {
  const navigate = useNavigate();
  const foundProductInfo = productsInfo.filter(i => i.productID === item._id);

  const clickHandler = async () => {
    navigate(`/polikarbonat/${item._id}`);
    await ProductService.updateProductPriceByID({id: item._id, views: item.views + 1});
  }

  return (   
    <div className="productitem__item" onClick={clickHandler}>
      <div className="productitem__item__image">
        <img className="productitem__item__image_img" src={SERVER_URL + item.coverImage} alt="parnichok" />
      </div>
      <div className="productitem__item__info">
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
          {item.price}.00 руб
        </div>
      </div>
    </div>
  )
}

export const ProductItem = React.memo(ProductItemInner);