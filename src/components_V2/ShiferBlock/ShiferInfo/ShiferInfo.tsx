import { CommandBarButton, IIconProps, initializeIcons } from '@fluentui/react';
import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { SERVER_URL } from '../../../constants/http';
import { DEFAULT_POLIKARBONAT_FILTER_TITLE, DEFAULT_RIM_PROFILE, DEFAULT_TYPE_ID_POLIKARBONAT, DEFAULT_TYPE_ID_POLIK_KREPEZH, NO_IMAGE } from '../../../constants/user';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { smoothScroll } from '../../../services/ClientServices/SmothScroll';
import { setAuthAdmin } from '../../../store/reducers/AuthReducer/AuthSlice';
import { addItem, clearItems } from '../../../store/reducers/CartReducer/CartSlice';
import { deleteProductByID, deleteProductInfos, getProductByID, getProductInfoByProductID } from '../../../store/reducers/ProductReducer/ProductActionCreators';
import { ICartItem } from '../../../types/ICartItem';
import { ConfirmOrder } from '../../ConfirmOrder/ConfirmOrder';
import { ProductNavigation } from '../../ProductsBlock/ProductNavigation/ProductNavigation';
import { ProductUpdate } from '../../ProductsBlock/ProductUpdate/ProductUpdate';
import { Loader_v2 } from '../../UI/Loader_v2/Loader_v2';
import { SuccessModal } from '../../UI/SuccessModal/SuccessModal';
// @ts-ignore
import starRatingSvg from '../../../assets/img/star_rating.png';
import { AiFillDownCircle } from 'react-icons/ai';
import { PocketFenceInfoInput } from '../../PicketFenceBlock/PicketFenceInfo/PicketFenceInfoUI/PocketFenceInfoInput';
import { ProductDescription } from '../../ProductsBlock/ProductDescription/ProductDescription';
import './shiferinfo.scss';

initializeIcons();

const deleteIcon: IIconProps = { iconName: 'Cancel' };
const editIcon: IIconProps = { iconName: 'Edit' };

const ShiferInfoInner: FC = () => {
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

  const [itemData, setItemData] = useState({itemCount: '', totalValue: '0'});
  const [warnings, setWarnings] = useState({count: false});

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
      typeID: product.typeID,
      title: product.name,
      price: product.price,
      imageUrl: SERVER_URL + product.coverImage,
      color: colorImage.choosenColor,
      thickness,
      density,
      size,
      count: +itemData.itemCount,
    };
    return item;
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

  // const handlerMinusCount = () => {
  //   if (count > 1) {
  //     setCount(prev => prev - 1)
  //   }
  // };

  // const handlerPlusCount = () => {
  //   setCount(prev => prev + 1)
  // };

  const totalValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setItemData({...itemData, itemCount: e.currentTarget.value});
    const total: number = +e.currentTarget.value * +price;
    // setItemData(prev => ({
    //   // return ({
    //     ...prev, 
    //     totalCount: total.toFixed(3)
    //   // })
    // }));
    setItemData(prev => ({
      // return ({
        ...prev,
        totalValue: (total).toFixed(2)
      // })
    }));
    if (e.currentTarget.value) {
      setWarnings(prev => ({...prev, count: false}));
    };
  };

  const confirmOrderHandler = () => {
    if (!itemData.itemCount) {
      setWarnings(prev => ({...prev, count: true}));
      return;
    };
    smoothScroll();
    const item = itemForOrder();
    dispatch(addItem(item));
    setConfirmOrder(true);
  };

  const addToCartHandler = () => {
    if (!itemData.itemCount) {
      setWarnings(prev => ({...prev, count: true}));
      return;
    };
    const item = itemForOrder();
    dispatch(addItem(item));
    setItemData({itemCount: '', totalValue: '0'});
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

    if (product._id === DEFAULT_RIM_PROFILE) {
      document.title = 'Римский профиль | Купить по Доступным Ценам + Доставка';
    }

    return () => {
      document.title = 'Поликарбонат | Купить по Доступным Ценам + Доставка';
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
      <main className="productinfo">
        {/* <ProductNavigation itemThickness={itemThickness} productTitle='Поликарбонат' productPageLink='/polikarbonat'/> */}
        <article 
          itemScope
          itemType="https://schema.org/Product"
          className="productinfo__wrapper">
          <header className="productinfo__titleblock">
            <h2
              itemProp="name" 
              className="productinfo__title">{product.name}</h2>
          </header>
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
            {/* <div className="productinfo__titleblock">
              <h2 className="productinfo__title">{product.name} {itemThickness}</h2>
            </div> */}
            <div 
              itemProp="image"
              itemScope
              itemType="http://schema.org/ImageObject"
              className="productinfo__imageblock">
              {/* <img className="productinfo__image" src={SERVER_URL + product?.coverImage} alt="product cover"/> */}
              <img 
                itemProp="contentUrl"
                className="productinfo__image_large" src={colorImage.imageData} alt="шифер"/>
              
              <div 
                itemProp="image"
                itemScope
                itemType="http://schema.org/ImageObject"
                className="productinfo__image__colors shifer_img_block">
                <img
                  onClick={() => setColorImage({imageData: SERVER_URL + product?.coverImage, isColor: false, choosenColor: 'Прозрачный'})}
                  itemProp="contentUrl"
                  className="productinfo__image__item shifer_img" src={SERVER_URL + product?.coverImage} alt="шифер" />

                {product._id === DEFAULT_RIM_PROFILE ? 
                  <>
                    <img
                      onClick={() => setColorImage({imageData: '../images/shifer_rim.jpg', isColor: false, choosenColor: 'Прозрачный'})}
                      itemProp="contentUrl"
                      className="productinfo__image__item shifer_img" src='../images/shifer_rim.jpg'  alt="шифер" />
                    <img
                      onClick={() => setColorImage({imageData: '../images/shifer_rim2.jpg', isColor: false, choosenColor: 'Прозрачный'})}
                      itemProp="contentUrl"
                      className="productinfo__image__item shifer_img" src='../images/shifer_rim2.jpg'  alt="шифер" />
                    <img
                      onClick={() => setColorImage({imageData: '../images/shifer_rim3.jpg', isColor: false, choosenColor: 'Прозрачный'})}
                      itemProp="contentUrl"
                      className="productinfo__image__item shifer_img" src='../images/shifer_rim3.jpg'  alt="шифер" />
                    <img
                      onClick={() => setColorImage({imageData: '../images/shifer_rim6.jpg', isColor: false, choosenColor: 'Прозрачный'})}
                      itemProp="contentUrl"
                      className="productinfo__image__item shifer_img" src='../images/shifer_rim6.jpg'  alt="шифер" />
                  </>
                : null}
                <meta itemProp="name" content='Шифер "Римская волна" фото'/>
                
              </div>
              <meta itemProp="name" content='Шифер "Римская волна" фото'/>
            </div>
            <div className="productinfo__info">
              <meta 
                itemProp="brand" 
                itemScope
                itemType="https://schema.org/Brand" 
                itemRef="site-url logo site-name sameAsFB sameAsInstagram sameAsYouTube" content='Шифер "Римский профиль"'/>
              {/* <div className="productinfo__titleblock">
                <h2 className="productinfo__title">{product.name} {itemThickness}</h2>
                
              </div> */}
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
              <div className="productinfo__price">{`${price} руб. за 1 лист`}</div>
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

              <div className="productinfo__cartinfo">
              <div className="picketfenceinfo__inputs">
                <div className="picketfenceinfo__inputs__block">
                  <PocketFenceInfoInput 
                    label='Количество шт.:'
                    value={itemData.itemCount}
                    onChangeHandler={totalValueHandler}
                    warning={warnings.count}
                    // setWarning={() => setWarnings(prev => ({...prev, count: false}))}
                  />
                </div>
                <div className="picketfenceinfo__inputs__count">
                  Итоговое количество: <b>{itemData.itemCount ? itemData.itemCount : '0'} шт.</b> 
                </div>
                <div className="picketfenceinfo__inputs__value">
                  Итоговая цена: <b>{itemData.totalValue} руб.</b> 
                </div>
              </div>
                {/* <div className="productinfo__cartinfo_count">
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
                </div> */}
                <button 
                  onClick={addToCartHandler}
                  className="productinfo__cart">
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" viewBox="0 0 512 512"><title/><g data-name="1" id="_1"><path fill="#fff" d="M397.78,316H192.65A15,15,0,0,1,178,304.33L143.46,153.85a15,15,0,0,1,14.62-18.36H432.35A15,15,0,0,1,447,153.85L412.4,304.33A15,15,0,0,1,397.78,316ZM204.59,286H385.84l27.67-120.48H176.91Z"/><path fill="#fff" d="M222,450a57.48,57.48,0,1,1,57.48-57.48A57.54,57.54,0,0,1,222,450Zm0-84.95a27.48,27.48,0,1,0,27.48,27.47A27.5,27.5,0,0,0,222,365.05Z"/><path fill="#fff" d="M368.42,450a57.48,57.48,0,1,1,57.48-57.48A57.54,57.54,0,0,1,368.42,450Zm0-84.95a27.48,27.48,0,1,0,27.48,27.47A27.5,27.5,0,0,0,368.42,365.05Z"/><path fill="#fff" d="M158.08,165.49a15,15,0,0,1-14.23-10.26L118.14,78H70.7a15,15,0,1,1,0-30H129a15,15,0,0,1,14.23,10.26l29.13,87.49a15,15,0,0,1-14.23,19.74Z"/></g></svg>

                  <div className="productinfo__cart_btn">В корзину</div>
                </button>
                <button
                  onClick={confirmOrderHandler}
                  className="productinfo__oneclick">
                  Оформить заказ
                </button>
              </div>
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
          <ProductDescription type={product.typeID} productID={product._id}/>
        </article>
      </main>
    
    </>
  )
}

export const ShiferInfo = React.memo(ShiferInfoInner)