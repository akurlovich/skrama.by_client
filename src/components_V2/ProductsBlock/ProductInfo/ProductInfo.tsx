import { IIconProps, initializeIcons } from '@fluentui/react';
import { CommandBarButton } from '@fluentui/react';
import React, { FC, useEffect, useState } from 'react';
import './productinfo.scss';
// @ts-ignore
import starRatingSvg from '../../../assets/img/star_rating.png';
// @ts-ignore
import minusSvg from '../../../assets/img/minus.png';
// @ts-ignore
import plusSvg from '../../../assets/img/plus.png';
// @ts-ignore
import beliy from '../../../assets/img/colors/beliy.jpg'
// @ts-ignore
import biruza from '../../../assets/img/colors/biruza.jpg'
// @ts-ignore
import bronza from '../../../assets/img/colors/bronza.jpg'
// @ts-ignore
import granat from '../../../assets/img/colors/granat.jpg'
// @ts-ignore
import krasniy from '../../../assets/img/colors/krasniy.jpg'
// @ts-ignore
import oranzhevi from '../../../assets/img/colors/oranzhevi.jpg'
// @ts-ignore
import prozrachniy from '../../../assets/img/colors/prozrachniy.jpg'
// @ts-ignore
import serebro from '../../../assets/img/colors/serebro.jpg'
// @ts-ignore
import seriy from '../../../assets/img/colors/seriy.jpg'
// @ts-ignore
import siniy from '../../../assets/img/colors/siniy.jpg'
// @ts-ignore
import zeleniy from '../../../assets/img/colors/zeleniy.jpg'
// @ts-ignore
import zheltiy from '../../../assets/img/colors/zheltiy.jpg'
import { deleteProductByID, deleteProductInfos, getProductByID, getProductInfoByProductID } from '../../../store/reducers/ProductReducer/ProductActionCreators';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { SuccessModal } from '../../UI/SuccessModal/SuccessModal';
import { addItem, clearItems } from '../../../store/reducers/CartReducer/CartSlice';
import { SERVER_URL } from '../../../constants/http';
import { ICartItem } from '../../../types/ICartItem';
import { DEFAULT_POLIKARBONAT_FILTER_TITLE, DEFAULT_TYPE_ID_POLIKARBONAT, DEFAULT_TYPE_ID_POLIK_KREPEZH, NO_IMAGE } from '../../../constants/user';
import { setAuthAdmin } from '../../../store/reducers/AuthReducer/AuthSlice';
import { ProductUpdate } from '../ProductUpdate/ProductUpdate';
import { ConfirmOrder } from '../../ConfirmOrder/ConfirmOrder';
import { AiFillDownCircle } from 'react-icons/ai';
import { Loader_v2 } from '../../UI/Loader_v2/Loader_v2';
import { ProductDescription } from '../ProductDescription/ProductDescription';
import { ProductNavigation } from '../ProductNavigation/ProductNavigation';
import { smoothScroll } from '../../../services/ClientServices/SmothScroll';

initializeIcons();

const deleteIcon: IIconProps = { iconName: 'Cancel' };
const editIcon: IIconProps = { iconName: 'Edit' };

const ProductInfoInner: FC = () => {
  const { product, productInfo, isLoading } = useAppSelector(state => state.productReducer);
  const { items } = useAppSelector(state => state.cartReducer);
  const { isAdminAuth } = useAppSelector(state => state.authReducer);
  const dispatch = useAppDispatch();
  const params = useParams();
  const navigate = useNavigate();
  // const foundProduct = products.find(item => item._id === params.id);
  const [count, setCount] = useState(1);
  const [successModal, setSuccessModal] = useState(false);
  const [updateProductModal, setUpdateProductModal] = useState(false);
  const [colorImage, setColorImage] = useState({imageData: NO_IMAGE, isColor: false, choosenColor: 'Прозрачный'});

  const [confirmOrder, setConfirmOrder] = useState(false);
  const [consultation, setConsultation] = useState(false);
  const [itemThickness, setItemThickness] = useState('');

  const [price, setPrice] = useState('0');
  // const price = (colorImage.isColor ? Math.ceil(product?.price * 1.1) : product?.price).toFixed(2);

  // const views = randomInteger(30, 455);

  // const admin = true;

  const onClickClear = () => {
    dispatch(clearItems());
  };

  const confirmConsultation = () => {
    smoothScroll();
    setConsultation(true);
  };

  const itemForOrder = () => {
    let thickness = '';
    let density = '';
    let size = '';
    for (const element of productInfo) {
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
    const item: ICartItem = {
      id: product._id,
      title: product.name,
      price: product.price,
      imageUrl: SERVER_URL + product.coverImage,
      color: colorImage.choosenColor,
      thickness,
      density,
      size,
      count: count,
    };
    return item;
  };

  const confirmOrderHandler = () => {
    smoothScroll();
    const item = itemForOrder();
    dispatch(addItem(item));
    setConfirmOrder(true);
  };

  const deleteProductHandler = async () => {
    if (params.id) {
      await dispatch(deleteProductByID(params.id));
      await dispatch(deleteProductInfos(params.id))
      alert(`Товар ${product?.name} удален!`);
      navigate(`/products`);
    }
  };

  const closeModalWindow = () => {
    setSuccessModal(false);
  };

  const handlerMinusCount = () => {
    if (count > 1) {
      setCount(prev => prev - 1)
    }
  };

  const handlerPlusCount = () => {
    setCount(prev => prev + 1)
  };

  const addToCartHandler = () => {
    const item = itemForOrder();
    dispatch(addItem(item));
    setSuccessModal(true);
    // console.log(productInfo);
  };

  const updateProductHandler = () => {
    setUpdateProductModal(true);
  };

  useEffect(() => {
    (async () => {
      if (params.id) {
        await dispatch(getProductInfoByProductID(params.id));
        await dispatch(getProductByID(params.id));
      }
    })();
    if (localStorage.getItem('token') === 'skrama@tut.by') {
      dispatch(setAuthAdmin());
    };
    smoothScroll();
  }, []);

  useEffect(() => {
    setColorImage(prev => ({...prev, imageData: SERVER_URL + product?.coverImage}));
    for (const element of productInfo) {
      switch (element.title) {
        case DEFAULT_POLIKARBONAT_FILTER_TITLE:
          setItemThickness(element.description);
          break;
      }
    };
    if (product.price) {
      setPrice((colorImage.isColor ? Math.ceil(product?.price * 1.1) : product?.price).toFixed(2));

    }
  }, [product])
  
  
  return (
    <>
      {isLoading && <Loader_v2/>}
      {successModal && 
        <SuccessModal
          title='Товар добавлен в корзину!'
          closeModal={closeModalWindow}
        />
      }
      {updateProductModal && 
        <ProductUpdate
          closeModal={setUpdateProductModal}
          productID={product._id}
          productPrice={product.price}
        />
      }
      {confirmOrder && <ConfirmOrder setModal={setConfirmOrder} onClickClear={onClickClear} items={items} long={true}/>}
      {consultation && <ConfirmOrder setModal={setConsultation} items={[]} short={true}/>}
      <div className="productinfo">
        <ProductNavigation itemThickness={itemThickness} productTitle='Поликарбонат' productPageLink='/polikarbonat'/>
        <div className="productinfo__wrapper">
          {isAdminAuth && (
                  <div className="productinfo__title_btns">
                  <CommandBarButton
                    iconProps={editIcon}
                    text="Изменить цену"
                    onClick={updateProductHandler}
                  />
                  <CommandBarButton
                    iconProps={deleteIcon}
                    text="Удалить"
                    onClick={deleteProductHandler}
                  />
                </div>)
              }
          <div className="productinfo__container">
            <div className="productinfo__imageblock">
              {/* <img className="productinfo__image" src={SERVER_URL + product?.coverImage} alt="product cover"/> */}
              <img className="productinfo__image" src={colorImage.imageData} alt="поликарбонат"/>
              {product.typeID === DEFAULT_TYPE_ID_POLIKARBONAT ? 
                <div className="productinfo__image__colors">
                  <img
                    onClick={() => setColorImage({imageData: SERVER_URL + product?.coverImage, isColor: false, choosenColor: 'Прозрачный'})}
                    className="productinfo__image__item" src={SERVER_URL + product?.coverImage} alt="поликарбонат" />
                  <img
                    onClick={() => setColorImage({imageData: beliy, isColor: true, choosenColor: 'Белый'})}
                    className="productinfo__image__item" src={beliy} alt="белый" />
                  <img
                    onClick={() => setColorImage({imageData: biruza, isColor: true, choosenColor: 'Бирюза'})}
                    className="productinfo__image__item" src={biruza} alt="бирюза" />
                  <img
                    onClick={() => setColorImage({imageData: bronza, isColor: true, choosenColor: 'Бронза'})}
                    className="productinfo__image__item" src={bronza} alt="бронза" />
                  <img
                    onClick={() => setColorImage({imageData: granat, isColor: true, choosenColor: 'Гранат'})}
                    className="productinfo__image__item" src={granat} alt="гранат" />
                  <img 
                    onClick={() => setColorImage({imageData: krasniy, isColor: true, choosenColor: 'Красный'})}
                    className="productinfo__image__item" src={krasniy} alt="красный" />
                  <img
                    onClick={() => setColorImage({imageData: oranzhevi, isColor: true, choosenColor: 'Оранжевый'})}
                    className="productinfo__image__item" src={oranzhevi} alt="оранжевый" />
                  <img
                    onClick={() => setColorImage({imageData: prozrachniy, isColor: true, choosenColor: 'Прозрачный'})}
                    className="productinfo__image__item" src={prozrachniy} alt="прозрачный" />
                  <img
                    onClick={() => setColorImage({imageData: serebro, isColor: true, choosenColor: 'Серебро'})}
                    className="productinfo__image__item" src={serebro} alt="серебро" />
                  <img
                    onClick={() => setColorImage({imageData: seriy, isColor: true, choosenColor: 'Серый'})}
                    className="productinfo__image__item" src={seriy} alt="серый" />
                  <img
                    onClick={() => setColorImage({imageData: siniy, isColor: true, choosenColor: 'Синий'})}
                    className="productinfo__image__item" src={siniy} alt="синий" />
                  <img 
                    onClick={() => setColorImage({imageData: zeleniy, isColor: true, choosenColor: 'Зеленый'})}
                    className="productinfo__image__item" src={zeleniy} alt="зеленый" />
                  <img
                    onClick={() => setColorImage({imageData: zheltiy, isColor: true, choosenColor: 'Желтый'})}
                    className="productinfo__image__item" src={zheltiy} alt="желтый" />
                </div>
                : null
              }
            </div>
            <div className="productinfo__info">
              <div className="productinfo__titleblock">
                <h2 className="productinfo__title">{product.name} {itemThickness}</h2>
                
              </div>
              <div className="productinfo__rating">
                <img src={starRatingSvg} alt='star'/>
                <img src={starRatingSvg} alt='star'/>
                <img src={starRatingSvg} alt='star'/>
                <img src={starRatingSvg} alt='star'/>
                <img src={starRatingSvg} alt='star'/>
                <div className="productinfo__rating_review">
                  Просмотров: {product.views} 
                </div>
              </div>
              <div className="productinfo__price">{`${price} руб.`}</div>
              <div className="productinfo__instock">
                <AiFillDownCircle size={24}/>
                <div className="productinfo__instock_text">
                  В наличии
                </div>
              </div>
              
                {productInfo.map(item => (
                  <div key={item._id} className="productinfo__addinfo">
                    <div className="">{item.title}:</div>
                    <div className="productinfo__addinfo__secondary">{item.description}</div>
                  </div>
                ))}

                {product.typeID !== DEFAULT_TYPE_ID_POLIK_KREPEZH ? 
                  <div className="productinfo__addinfo">
                    <div className="">Цвет:</div>
                    <div className="productinfo__addinfo__secondary">{colorImage.choosenColor}</div>
                  </div>
                  : null
                }


              <div className="productinfo__cartinfo">
                <div className="productinfo__cartinfo_count">
                  <button 
                    disabled={count === 1}
                    className={count < 2 ? "productinfo__cartinfo_block notActive" : "productinfo__cartinfo_block"}
                    onClick={handlerMinusCount}
                  >
                    <img src={minusSvg} alt="minus" />
                  </button>
                  <div className="productinfo__cartinfo_block nothover">
                    <div>{count}</div>
                  </div>
                  <button 
                    className="productinfo__cartinfo_block"
                    onClick={handlerPlusCount}
                  >
                    <img src={plusSvg} alt="plus" />
                  </button>
                </div>
                <div 
                  onClick={addToCartHandler}
                  className="productinfo__cart">
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" viewBox="0 0 512 512"><title/><g data-name="1" id="_1"><path fill="#fff" d="M397.78,316H192.65A15,15,0,0,1,178,304.33L143.46,153.85a15,15,0,0,1,14.62-18.36H432.35A15,15,0,0,1,447,153.85L412.4,304.33A15,15,0,0,1,397.78,316ZM204.59,286H385.84l27.67-120.48H176.91Z"/><path fill="#fff" d="M222,450a57.48,57.48,0,1,1,57.48-57.48A57.54,57.54,0,0,1,222,450Zm0-84.95a27.48,27.48,0,1,0,27.48,27.47A27.5,27.5,0,0,0,222,365.05Z"/><path fill="#fff" d="M368.42,450a57.48,57.48,0,1,1,57.48-57.48A57.54,57.54,0,0,1,368.42,450Zm0-84.95a27.48,27.48,0,1,0,27.48,27.47A27.5,27.5,0,0,0,368.42,365.05Z"/><path fill="#fff" d="M158.08,165.49a15,15,0,0,1-14.23-10.26L118.14,78H70.7a15,15,0,1,1,0-30H129a15,15,0,0,1,14.23,10.26l29.13,87.49a15,15,0,0,1-14.23,19.74Z"/></g></svg>

                  <div className="productinfo__cart_btn">В корзину</div>
                </div>
              </div>
              <button
                onClick={confirmOrderHandler}
                className="productinfo__oneclick">
                Оформить заказ
              </button>
              <div className="productinfo__consultation">
                <div className="productinfo__consultation_text">
                  Подробно проконсультируем о наших товарах, способах оплаты и доставки.
                </div>
                <button
                  onClick={confirmConsultation}
                  className="productinfo__consultation_btn">
                  Заказать консультацию
                </button>
              </div>
            </div>
          </div>
          <ProductDescription/>
        </div>
      </div>
    
    </>
  )
}

export const ProductInfo = React.memo(ProductInfoInner);