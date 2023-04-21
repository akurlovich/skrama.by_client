import { IIconProps, initializeIcons } from '@fluentui/react';
import { CommandBarButton } from '@fluentui/react';
import React, { FC, useEffect, useState } from 'react';
import './picketfenceinfo.scss';
import { deleteProductByID, deleteProductInfos, getProductByID, getProductInfoByProductID } from '../../../store/reducers/ProductReducer/ProductActionCreators';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { SuccessModal } from '../../UI/SuccessModal/SuccessModal';
import { addItem, clearItems } from '../../../store/reducers/CartReducer/CartSlice';
import { SERVER_URL } from '../../../constants/http';
import { ICartItem } from '../../../types/ICartItem';
import { DEFAULT_TYPE_ID_POLIKARBONAT, DEFAULT_TYPE_ID_POLIK_KREPEZH, DEFAULT_TYPE_ID_SHTAKETNIK, NO_IMAGE, SHTAKETNIK_COLORS } from '../../../constants/user';
import { setAuthAdmin } from '../../../store/reducers/AuthReducer/AuthSlice';
import { ConfirmOrder } from '../../ConfirmOrder/ConfirmOrder';
import { AiFillDownCircle } from 'react-icons/ai';
import { Loader_v2 } from '../../UI/Loader_v2/Loader_v2';
import { smoothScroll } from '../../../services/ClientServices/SmothScroll';
import { ProductUpdate } from '../../ProductsBlock/ProductUpdate/ProductUpdate';
import { ProductNavigation } from '../../ProductsBlock/ProductNavigation/ProductNavigation';
// @ts-ignore
import starRatingSvg from '../../../assets/img/star_rating.png';
// @ts-ignore
import minusSvg from '../../../assets/img/minus.png';
// @ts-ignore
import plusSvg from '../../../assets/img/plus.png';
import { ProductDescription } from '../../ProductsBlock/ProductDescription/ProductDescription';
import { getProductColorsByProductID } from '../../../store/reducers/ColorReducer/ColorActionCreaters';

initializeIcons();

const deleteIcon: IIconProps = { iconName: 'Cancel' };
const editIcon: IIconProps = { iconName: 'Edit' };

const PicketFenceInfoInner: FC = () => {
  const { product, productInfo, isLoading } = useAppSelector(state => state.productReducer);
  const { colorsByProduct } = useAppSelector(state => state.colorsReducer);
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
  const [isOpenColors, setIsOpenColors] = useState(false);
  const [selectedColor, setSelectedColor] = useState('Выберите цвет:');

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
    // console.log(product._id)
    (async () => { 
    setColorImage(prev => ({...prev, imageData: SERVER_URL + product?.coverImage}));
    for (const element of productInfo) {
      switch (element.title) {
        case 'Толщина':
          setItemThickness(element.description);
          break;
      }
    };
    if (product.price) {
      await dispatch(getProductColorsByProductID(product._id));
      setPrice((colorImage.isColor ? Math.ceil(product?.price * 1.1) : product?.price).toFixed(2));

    }
  })();
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
      <div className="picketfenceinfo">
        <ProductNavigation itemThickness={itemThickness}/>
        <div className="picketfenceinfo__wrapper">
          {isAdminAuth && (
                  <div className="picketfenceinfo__title_btns">
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
          <div className="picketfenceinfo__container">
            <div className="picketfenceinfo__imageblock">
              {/* <img className="picketfenceinfo__image" src={SERVER_URL + product?.coverImage} alt="product cover"/> */}
              <img className="picketfenceinfo__image" src={colorImage.imageData} alt="поликарбонат"/>
              { (product.typeID === DEFAULT_TYPE_ID_SHTAKETNIK &&
                colorsByProduct.length) ? 
                <div className="picketfenceinfo__image__colors">
                  <img
                    onClick={() => setColorImage({imageData: SERVER_URL + '/product-color/' + colorsByProduct[0]?.coverImage, isColor: false, choosenColor: 'Прозрачный'})}
                    className="picketfenceinfo__image__item" src={SERVER_URL + '/product-color/' + colorsByProduct[0]?.coverImage} alt="поликарбонат" />
                </div>
                : null
              }
            </div>
            <div className="picketfenceinfo__info">
              <div className="picketfenceinfo__titleblock">
                <h2 className="picketfenceinfo__title">{product.name} {itemThickness}</h2>
                
              </div>
              <div className="picketfenceinfo__rating">
                <img src={starRatingSvg} alt='star'/>
                <img src={starRatingSvg} alt='star'/>
                <img src={starRatingSvg} alt='star'/>
                <img src={starRatingSvg} alt='star'/>
                <img src={starRatingSvg} alt='star'/>
                <div className="picketfenceinfo__rating_review">
                  Просмотров: {product.views} 
                </div>
              </div>
              <div className="picketfenceinfo__price">{`${price} руб.`}</div>
              <div className="picketfenceinfo__instock">
                <AiFillDownCircle size={24}/>
                <div
                  className="picketfenceinfo__instock_text">
                  В наличии
                </div>
              </div>
              
                {productInfo.map(item => (
                  <div key={item._id} className="picketfenceinfo__addinfo">
                    <div className="">{item.title}:</div>
                    <div className="picketfenceinfo__addinfo__secondary">{item.description}</div>
                  </div>
                ))}

                {product.typeID !== DEFAULT_TYPE_ID_POLIK_KREPEZH ? 
                  <div className="picketfenceinfo__addinfo">
                    <div className="">Цвет:</div>
                    {/* <div className="picketfenceinfo__addinfo__secondary">{colorImage.choosenColor}</div> */}
                    <div 
                      onClick={() => setIsOpenColors(prev => !prev)}
                      onMouseLeave={() => setIsOpenColors(false)}
                      className="picketfenceinfo__addinfo__secondary colorsmain">
                      <div className="">{selectedColor}</div>
                      {isOpenColors &&
                        <div className="picketfenceinfo__addinfo__secondary colorsblock">
                          {SHTAKETNIK_COLORS.map(item => 
                            <div 
                              onClick={() => setSelectedColor(item.title)}
                              key={item.title} 
                              className="picketfenceinfo__colorselect">
                              <div
                                style={{backgroundColor: item.color}}
                                className="picketfenceinfo__colorselect__img"></div>
                              <div className="picketfenceinfo__colorselect__text">
                                {item.title}
                              </div>
                            </div>  
                          )}
                        </div>
                      }
                    </div>
                  </div>
                  : null
                }


              <div className="picketfenceinfo__cartinfo">
                <div className="picketfenceinfo__cartinfo_count">
                  <button 
                    disabled={count === 1}
                    className={count < 2 ? "picketfenceinfo__cartinfo_block notActive" : "picketfenceinfo__cartinfo_block"}
                    onClick={handlerMinusCount}
                  >
                    <img src={minusSvg} alt="minus" />
                  </button>
                  <div className="picketfenceinfo__cartinfo_block nothover">
                    <div>{count}</div>
                  </div>
                  <button 
                    className="picketfenceinfo__cartinfo_block"
                    onClick={handlerPlusCount}
                  >
                    <img src={plusSvg} alt="plus" />
                  </button>
                </div>
                <div 
                  onClick={addToCartHandler}
                  className="picketfenceinfo__cart">
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" viewBox="0 0 512 512"><title/><g data-name="1" id="_1"><path fill="#fff" d="M397.78,316H192.65A15,15,0,0,1,178,304.33L143.46,153.85a15,15,0,0,1,14.62-18.36H432.35A15,15,0,0,1,447,153.85L412.4,304.33A15,15,0,0,1,397.78,316ZM204.59,286H385.84l27.67-120.48H176.91Z"/><path fill="#fff" d="M222,450a57.48,57.48,0,1,1,57.48-57.48A57.54,57.54,0,0,1,222,450Zm0-84.95a27.48,27.48,0,1,0,27.48,27.47A27.5,27.5,0,0,0,222,365.05Z"/><path fill="#fff" d="M368.42,450a57.48,57.48,0,1,1,57.48-57.48A57.54,57.54,0,0,1,368.42,450Zm0-84.95a27.48,27.48,0,1,0,27.48,27.47A27.5,27.5,0,0,0,368.42,365.05Z"/><path fill="#fff" d="M158.08,165.49a15,15,0,0,1-14.23-10.26L118.14,78H70.7a15,15,0,1,1,0-30H129a15,15,0,0,1,14.23,10.26l29.13,87.49a15,15,0,0,1-14.23,19.74Z"/></g></svg>

                  <div className="picketfenceinfo__cart_btn">В корзину</div>
                </div>
              </div>
              <button
                onClick={confirmOrderHandler}
                className="picketfenceinfo__oneclick">
                Оформить заказ
              </button>
              <div className="picketfenceinfo__consultation">
                <div className="picketfenceinfo__consultation_text">
                  Подробно проконсультируем о наших товарах, способах оплаты и доставки.
                </div>
                <button
                  onClick={confirmConsultation}
                  className="picketfenceinfo__consultation_btn">
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

export const PicketFenceInfo = React.memo(PicketFenceInfoInner);