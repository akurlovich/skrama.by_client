import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import './picketfenceinfo.scss';
import { deleteProductByID, deleteProductInfos, getProductByID, getProductInfoByProductID } from '../../../store/reducers/ProductReducer/ProductActionCreators';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { SuccessModal } from '../../UI/SuccessModal/SuccessModal';
import { addItem, clearItems } from '../../../store/reducers/CartReducer/CartSlice';
import { SERVER_URL } from '../../../constants/http';
import { ICartItem } from '../../../types/ICartItem';
import { DEFAULT_SHTAKETNIK_FILTER_TITLE, DEFAULT_TYPE_ID_POLIKARBONAT, DEFAULT_TYPE_ID_POLIK_KREPEZH, DEFAULT_TYPE_ID_SHTAKETNIK, NO_IMAGE, SHTAKETNIK_COLORS } from '../../../constants/user';
import { setAuthAdmin } from '../../../store/reducers/AuthReducer/AuthSlice';
import { ConfirmOrder } from '../../ConfirmOrder/ConfirmOrder';
import { AiFillDownCircle } from 'react-icons/ai';
import { Loader_v2 } from '../../UI/Loader_v2/Loader_v2';
import { smoothScroll } from '../../../services/ClientServices/SmothScroll';
import { ProductUpdate } from '../../ProductsBlock/ProductUpdate/ProductUpdate';
import { ProductNavigation } from '../../ProductsBlock/ProductNavigation/ProductNavigation';
// @ts-ignore
import starRatingSvg from '../../../assets/img/star_rating.png';
import { ProductDescription } from '../../ProductsBlock/ProductDescription/ProductDescription';
import { getProductColorsByProductID } from '../../../store/reducers/ColorReducer/ColorActionCreaters';
import { AdminBtns } from '../../UI/AdminBtns/AdminBtns';
import { PocketFenceInfoInput } from './PicketFenceInfoUI/PocketFenceInfoInput';

type PopupClick = MouseEvent & {
  path: Node[];
};

const PicketFenceInfoInner: FC = () => {
  const { product, productInfo, isLoading } = useAppSelector(state => state.productReducer);
  const { colorsByProduct } = useAppSelector(state => state.colorsReducer);
  const { items } = useAppSelector(state => state.cartReducer);
  const { isAdminAuth } = useAppSelector(state => state.authReducer);
  const dispatch = useAppDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const [successModal, setSuccessModal] = useState(false);
  const [updateProductModal, setUpdateProductModal] = useState(false);
  const [colorImage, setColorImage] = useState({imageData: NO_IMAGE, isColor: false, choosenColor: 'Прозрачный'});
  const [confirmOrder, setConfirmOrder] = useState(false);
  const [consultation, setConsultation] = useState(false);
  const [itemThickness, setItemThickness] = useState('');
  const colorsRef = React.useRef<HTMLDivElement>(null);
  const [isOpenColors, setIsOpenColors] = useState(false);
  const [selectedColor, setSelectedColor] = useState('');
  const [availableColors, setavailableColors] = useState(SHTAKETNIK_COLORS.slice(0, 4));
  const [itemData, setItemData] = useState({itemLong: '', itemCount: '', totalCount: '0', totalValue: '0', itemPrice: '0'});


  const onClickClear = () => {
    dispatch(clearItems());
  };

  const confirmConsultation = () => {
    smoothScroll();
    setConsultation(true);
  };

  const itemForOrder = () => {
    let coverSides = '';
    let coverType = '';
    for (const element of productInfo) {
      switch (element.title) {
        case 'Вид покрытия':
          coverType = element.description;
          break;
        case 'Стороны покрытия':
          coverSides = element.description;
          break;
      }
    }
    const item: ICartItem = {
      id: product._id,
      typeID: product.typeID,
      title: product.name,
      price: product.price,
      imageUrl: SERVER_URL + product.coverImage,
      color: selectedColor,
      thickness: coverSides,
      density: coverType,
      size: itemData.itemLong,
      count: +itemData.totalCount,
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

  const totalCountHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setItemData({...itemData, itemLong: e.currentTarget.value})
    const total: number = +itemData.itemCount / 1000 * +e.currentTarget.value;
    setItemData((prev) => {
      return ({
        ...prev, 
        totalCount: total.toFixed(3)
      })
    });
    setItemData((prev) => {
      return ({
        ...prev,
        totalValue: (total * +itemData.itemPrice).toFixed(2)
      })
    });
  };

  const totalValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setItemData({...itemData, itemCount: e.currentTarget.value})
    const total: number = +itemData.itemLong / 1000 * +e.currentTarget.value;
    setItemData((prev) => {
      return ({
        ...prev, 
        totalCount: total.toFixed(3)
      })
    });
    setItemData((prev) => {
      return ({
        ...prev,
        totalValue: (total * +itemData.itemPrice).toFixed(2)
      })
    });
  };

  const itemColorHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedColor(event.currentTarget.value)
  }

  const addToCartHandler = () => {
    const item = itemForOrder();
    dispatch(addItem(item));
    setItemData({itemLong: '', itemCount: '', totalCount: '0', totalValue: '0', itemPrice: '0'});
    setSuccessModal(true);
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
    setavailableColors(SHTAKETNIK_COLORS);
  }, []);

  useEffect(() => {
    let flag = false;
    for (const item of productInfo) {
      if (item.title === 'Вид покрытия' && item.description === 'PrintTech') {
        flag = true;
      }
    };
    if (flag) {
      setavailableColors(SHTAKETNIK_COLORS.slice(4, 6));
    } else {
      setavailableColors(SHTAKETNIK_COLORS.slice(0, 4));
    }
    (async () => {
      if (params.id) {
        await dispatch(getProductInfoByProductID(params.id));
      };
      setColorImage(prev => ({...prev, imageData: SERVER_URL + product?.coverImage}));
      for (const element of productInfo) {
        switch (element.title) {
          case DEFAULT_SHTAKETNIK_FILTER_TITLE:
            setItemThickness(element.description);
            break;
        }
      };
    if (product.price) {
      await dispatch(getProductColorsByProductID(product._id));
      setItemData((prev) => {
        return ({
          ...prev,
          itemPrice: product.price.toFixed(2)
        })
      });

    }
  })();
  }, [product]);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const _event = event as PopupClick;

      if (!colorsRef.current?.contains(_event.target as Node)) {
          setIsOpenColors(false);
      };
    };

    document.body.addEventListener('click', handleClickOutside);

    return () => document.body.removeEventListener('click', handleClickOutside);
  }, []);
  
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
      <div 
        // ref={colorsRef}
        className="picketfenceinfo">
        <ProductNavigation itemThickness={itemThickness} productTitle='Штакетник' productPageLink='/shtaketnik'/>
        <div className="picketfenceinfo__wrapper">
          {isAdminAuth && 
            <AdminBtns
              updateProductHandler={updateProductHandler}
              deleteProductHandler={deleteProductHandler}
            />}
          <div className="picketfenceinfo__container">
            <div className="picketfenceinfo__imageblock">
              <img className="picketfenceinfo__image" src={colorImage.imageData} alt="штакетник"/>
              { (product.typeID === DEFAULT_TYPE_ID_SHTAKETNIK &&
                colorsByProduct.length) ? 
                <div className="picketfenceinfo__image__colors">
                  <img
                    onClick={() => setColorImage({imageData: SERVER_URL + product?.coverImage, isColor: false, choosenColor: 'Прозрачный'})}
                    className="picketfenceinfo__image__item" src={SERVER_URL + product?.coverImage} alt="штакетник" />
                  {colorsByProduct.map(item => (
                    <img
                    key={item.coverImage}
                    onClick={() => setColorImage({imageData: SERVER_URL + '/product-color/' + item.coverImage, isColor: false, choosenColor: 'Прозрачный'})}
                    className="picketfenceinfo__image__item" src={SERVER_URL + '/product-color/' + item.coverImage} alt="штакетник" />
                  ))}
                </div>
                : null
              }
            </div>
            <div className="picketfenceinfo__info">
              <div className="picketfenceinfo__titleblock">
                <h2 className="picketfenceinfo__title">{product.name}</h2>
                
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
              <div className="picketfenceinfo__price">{`${itemData.itemPrice} руб. за 1 м.пог.`}</div>
              <div className="picketfenceinfo__instock">
                <AiFillDownCircle size={24}/>
                <div
                  className="picketfenceinfo__instock_text">
                  В наличии
                </div>
              </div>
              
                {productInfo.map(item => (
                  <div key={item._id} className="picketfenceinfo__addinfo">
                    <div className="">{`${item.title}:`}</div>
                    <div className="picketfenceinfo__addinfo__secondary">{item.description}</div>
                  </div>
                ))}

              <div className="picketfenceinfo__cartinfo">
                <div className="picketfenceinfo__inputs">
                  <div className="picketfenceinfo__inputs__block">
                    <div className="picketfenceinfo__inputs__item">
                      <div 
                        ref={colorsRef}
                        onClick={() => setIsOpenColors(prev => !prev)}
                        // onMouseLeave={() => setIsOpenColors(false)}
                        className="selected_colors">
                          <div className="picketfenceinfo__addinfo__selectedcolor">
                            {selectedColor}
                          </div>
                          {isOpenColors &&
                            <div className="picketfenceinfo__addinfo__secondary colorsblock">
                              {availableColors.map(item => 
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
                      <div className={selectedColor ? 'for_selected_colors active_color' : 'for_selected_colors'} >Цвет:</div>
                    </div>
                    <PocketFenceInfoInput 
                      label='Длинна (высота) мм.:'
                      value={itemData.itemLong}
                      onChangeHandler={totalCountHandler}
                    />
                    <PocketFenceInfoInput 
                      label='Количество шт.:'
                      value={itemData.itemCount}
                      onChangeHandler={totalValueHandler}
                    />
                  </div>
                  <div className="picketfenceinfo__inputs__count">
                    Итоговое количество: <b>{itemData.totalCount} м.пог.</b> 
                  </div>
                  <div className="picketfenceinfo__inputs__value">
                    Итоговая цена: <b>{itemData.totalValue} руб.</b> 
                  </div>
                </div>
                <div 
                  onClick={addToCartHandler}
                  className="picketfenceinfo__cart">
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" viewBox="0 0 512 512"><title/><g data-name="1" id="_1"><path fill="#fff" d="M397.78,316H192.65A15,15,0,0,1,178,304.33L143.46,153.85a15,15,0,0,1,14.62-18.36H432.35A15,15,0,0,1,447,153.85L412.4,304.33A15,15,0,0,1,397.78,316ZM204.59,286H385.84l27.67-120.48H176.91Z"/><path fill="#fff" d="M222,450a57.48,57.48,0,1,1,57.48-57.48A57.54,57.54,0,0,1,222,450Zm0-84.95a27.48,27.48,0,1,0,27.48,27.47A27.5,27.5,0,0,0,222,365.05Z"/><path fill="#fff" d="M368.42,450a57.48,57.48,0,1,1,57.48-57.48A57.54,57.54,0,0,1,368.42,450Zm0-84.95a27.48,27.48,0,1,0,27.48,27.47A27.5,27.5,0,0,0,368.42,365.05Z"/><path fill="#fff" d="M158.08,165.49a15,15,0,0,1-14.23-10.26L118.14,78H70.7a15,15,0,1,1,0-30H129a15,15,0,0,1,14.23,10.26l29.13,87.49a15,15,0,0,1-14.23,19.74Z"/></g></svg>

                  <div className="picketfenceinfo__cart_btn">В корзину</div>
                </div>
                <button
                  onClick={confirmOrderHandler}
                  className="picketfenceinfo__oneclick">
                  Оформить заказ
                </button>

              </div>
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
          <ProductDescription type={product.typeID}/>
        </div>
      </div>
    
    </>
  )
}

export const PicketFenceInfo = React.memo(PicketFenceInfoInner);