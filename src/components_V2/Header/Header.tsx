import { FC, useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { BiPhoneCall } from "react-icons/bi"
import './header.scss';
import { ICartItem } from "../../types/ICartItem";
import { addItem } from "../../store/reducers/CartReducer/CartSlice";
import {isMobile} from 'react-device-detect';

type PopupClick = MouseEvent & {
  path: Node[];
};

export const Header: FC = () => {
  const { totalPrice, items } = useAppSelector(state => state.cartReducer);
  const totalCount = items.reduce((sum, item) => sum + item.count, 0);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [showItems, setShowItems] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const showItemsHandler = () => {
    setShowItems(prev => !prev);
  };

  // useEffect(() => {
  //   const json = JSON.stringify(items);
  //   localStorage.setItem('cart', json)
    
  // }, [items]);

  useEffect(() => {
    const json = localStorage.getItem('cart');
    if (json) {
      const data: ICartItem[] = JSON.parse(json);
      for (const item of data) {
        dispatch(addItem(item));
      }
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const _event = event as PopupClick;

      if (!menuRef.current?.contains(_event.target as Node)) {
          setShowItems(false);
      };
    };

    document.body.addEventListener('click', handleClickOutside);

    return () => document.body.removeEventListener('click', handleClickOutside);
  }, []);
  
  
  return (
    <header 
      // onMouseLeave={() => setShowItems(false)}
      className="header">
      <section className="header__toolbar">
        <div className="header__toolbar__contacts">
          <div className="header__toolbar__tel">
            <div className="header__toolbar__tel__icon">
              <BiPhoneCall size={40}/>
            </div>
            <a href={isMobile ? "tel:+375291342197" : '/'} className="header__toolbar__tel__text">
              +375(29) 134-21-97
            </a>
          </div>
          <a className="header__toolbar__viber" href="viber://chat?number=%2B375291342197">
            {/* <img src={viberSvg} alt="viber" /> */}
            <svg  enableBackground="new 0 0 128 128" id="Social_Icons" version="1.1" viewBox="0 0 128 128" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><g id="_x34__stroke"><g id="Viber_1_"><rect clipRule="evenodd" fill="none" fillRule="evenodd" height="128" width="128"/><path clipRule="evenodd" d="M71.4,44.764c2.492,0.531,4.402,1.478,6.034,3.006    c2.1,1.983,3.251,4.383,3.757,7.831c0.342,2.248,0.202,3.132-0.595,3.865c-0.746,0.682-2.125,0.707-2.96,0.063    c-0.607-0.455-0.797-0.935-0.936-2.236c-0.164-1.731-0.468-2.943-0.987-4.067c-1.113-2.387-3.074-3.625-6.388-4.029    c-1.556-0.19-2.024-0.366-2.53-0.96c-0.924-1.099-0.569-2.88,0.708-3.537c0.481-0.24,0.683-0.265,1.746-0.202    C69.908,44.536,70.882,44.65,71.4,44.764z M68.706,35.227c7.679,1.124,13.624,4.686,17.521,10.471    c2.189,3.259,3.555,7.086,4.023,11.191c0.164,1.503,0.164,4.244-0.013,4.699c-0.165,0.429-0.696,1.01-1.151,1.25    c-0.493,0.253-1.543,0.227-2.125-0.076c-0.974-0.493-1.265-1.276-1.265-3.398c0-3.271-0.848-6.72-2.315-9.398    c-1.67-3.057-4.099-5.583-7.059-7.339c-2.543-1.516-6.3-2.64-9.728-2.918c-1.24-0.101-1.923-0.354-2.391-0.897    c-0.721-0.821-0.797-1.933-0.19-2.855C64.67,34.937,65.682,34.772,68.706,35.227z M38.914,27.434    c0.443,0.152,1.126,0.505,1.518,0.758c2.403,1.592,9.095,10.143,11.284,14.412c1.252,2.438,1.67,4.244,1.278,5.583    c-0.405,1.44-1.075,2.198-4.074,4.61c-1.202,0.972-2.328,1.97-2.505,2.236c-0.455,0.657-0.822,1.945-0.822,2.855    c0.013,2.109,1.379,5.937,3.175,8.88c1.391,2.286,3.883,5.216,6.35,7.465c2.897,2.653,5.452,4.459,8.337,5.886    c3.707,1.844,5.971,2.311,7.628,1.541c0.417-0.19,0.86-0.442,0.999-0.556c0.126-0.114,1.101-1.301,2.163-2.615    c2.049-2.577,2.517-2.994,3.922-3.474c1.784-0.606,3.605-0.442,5.44,0.493c1.392,0.72,4.428,2.602,6.388,3.966    c2.581,1.806,8.096,6.303,8.843,7.2c1.315,1.617,1.543,3.688,0.658,5.975c-0.936,2.412-4.579,6.934-7.122,8.867    c-2.302,1.743-3.934,2.412-6.085,2.513c-1.771,0.088-2.505-0.063-4.769-0.998C63.76,95.718,49.579,84.805,38.32,69.811    c-5.882-7.831-10.361-15.953-13.422-24.378c-1.784-4.913-1.872-7.048-0.405-9.562c0.633-1.061,3.327-3.688,5.288-5.153    c3.264-2.425,4.769-3.322,5.971-3.575C36.574,26.966,38.004,27.105,38.914,27.434z M67.833,26.07    c4.352,0.543,7.868,1.591,11.727,3.474c3.795,1.857,6.224,3.613,9.437,6.808c3.011,3.019,4.681,5.305,6.452,8.854    c2.467,4.951,3.871,10.838,4.111,17.317c0.089,2.21,0.025,2.703-0.481,3.335c-0.961,1.225-3.074,1.023-3.795-0.354    c-0.228-0.455-0.291-0.846-0.367-2.615c-0.127-2.716-0.316-4.471-0.696-6.568c-1.493-8.223-5.44-14.791-11.74-19.503    c-5.25-3.941-10.677-5.861-17.786-6.278c-2.404-0.139-2.821-0.227-3.365-0.644c-1.012-0.796-1.063-2.665-0.089-3.537    c0.595-0.543,1.012-0.619,3.074-0.556C65.392,25.842,66.973,25.969,67.833,26.07z M64,0c35.346,0,64,28.654,64,64    s-28.654,64-64,64S0,99.346,0,64S28.654,0,64,0z" fill="#7F4DA0" fillRule="evenodd" id="Viber"/></g></g></svg>
            Написать нам
          </a>
        </div>
        <Link to='/'>
          <h1 className="header__toolbar__title">
            Skrama
            <span>24</span>
          </h1>
        </Link>
        <div className="header__toolbar__cart">
          {location.pathname !== '/cart' && (
            <Link to="/cart" className="header__toolbar__cart__button">
              <span>{totalPrice} руб</span>
              <div className="header__toolbar__cart__button__delimiter"></div>
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.33333 16.3333C7.06971 16.3333 7.66667 15.7364 7.66667 15C7.66667 14.2636 7.06971 13.6667 6.33333 13.6667C5.59695 13.6667 5 14.2636 5 15C5 15.7364 5.59695 16.3333 6.33333 16.3333Z"
                  stroke="white"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14.3333 16.3333C15.0697 16.3333 15.6667 15.7364 15.6667 15C15.6667 14.2636 15.0697 13.6667 14.3333 13.6667C13.597 13.6667 13 14.2636 13 15C13 15.7364 13.597 16.3333 14.3333 16.3333Z"
                  stroke="white"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4.78002 4.99999H16.3334L15.2134 10.5933C15.1524 10.9003 14.9854 11.176 14.7417 11.3722C14.4979 11.5684 14.1929 11.6727 13.88 11.6667H6.83335C6.50781 11.6694 6.1925 11.553 5.94689 11.3393C5.70128 11.1256 5.54233 10.8295 5.50002 10.5067L4.48669 2.82666C4.44466 2.50615 4.28764 2.21182 4.04482 1.99844C3.80201 1.78505 3.48994 1.66715 3.16669 1.66666H1.66669"
                  stroke="white"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>{totalCount}</span>
            </Link>
          )}
        </div>
      </section>
      <nav className="header__navbar">
        <NavLink
          to='/'
          className={({ isActive }) => isActive ? 'header__navbar__item active' : 'header__navbar__item'}>
          Главная
        </NavLink>
        <div
          ref={menuRef}
          className="header__navbar__list">
          <div
            onClick={showItemsHandler}
            className="header__navbar__item list">
            Продукция
            <svg width="14" height="14" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.92871 4.19501L0.595703 0.195007H7.2627L3.92871 4.19501Z" fill="#FFF"/>
            </svg>
            {/* <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z" fill="#FFF"/>
            </svg> */}
          </div>
          {showItems && 
            <div 
              // onMouseLeave={() => setShowItems(false)}
              className="header__navbar__list_items">
              <NavLink
                to='/polikarbonat'
                onClick={() => setShowItems(false)}
                className={({ isActive }) => isActive ? 'header__navbar__item active' : 'header__navbar__item show'}>
                Поликарбонат
              </NavLink>
              <NavLink 
                to='/shtaketnik'
                onClick={() => setShowItems(false)}
                className={({ isActive }) => isActive ? 'header__navbar__item active' : 'header__navbar__item show'}>
                Штакетник
              </NavLink>
            </div> 
          }
        </div>
        <NavLink
          to='/about'
          className={({ isActive }) => isActive ? 'header__navbar__item active' : 'header__navbar__item'}>
          Контакты
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;