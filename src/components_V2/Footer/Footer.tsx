import React, { FC } from 'react';
import { AiOutlineArrowRight, AiOutlineCopyrightCircle, AiOutlineMail } from "react-icons/ai";
import { Link, NavLink } from 'react-router-dom';
import './footer.scss';

const FooterInner: FC = () => {
  return (
    <footer className="footer">
      <nav className="footer__wrapper">
        <NavLink 
          to='/' 
          className={({ isActive }) => isActive ? 'footer__links active' : 'footer__links'}>
          <AiOutlineArrowRight size={30} />
          <div className="footer__links__text">
            Главная
          </div>
        </NavLink>
        <NavLink to='/polikarbonat' className={({ isActive }) => isActive ? 'footer__links active' : 'footer__links'}>
          <AiOutlineArrowRight size={30}/>
          <div className="footer__links__text">
            Продукция
          </div>
        </NavLink>
        <NavLink to='/about' className={({ isActive }) => isActive ? 'footer__links active' : 'footer__links'}>
          <AiOutlineArrowRight size={30}/>
          <div className="footer__links__text">
            Контакты
          </div>
        </NavLink>
      </nav>
      <div className="footer__copywrite">
        <div className="footer__item">
          <AiOutlineCopyrightCircle size={30}/>
          <div className="footer__text">
            Copyright: Artsiom Kurlovich
          </div>
        </div>
        <div className="footer__item">
          <AiOutlineMail size={30}/>
          <div>
            <a className="footer__text" href="mailto: info@skrama.by">info@skrama.by</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export const Footer = React.memo(FooterInner);
