import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import './productnavigation.scss';

interface IProps {
  itemThickness: string;
  productTitle: string;
  productPageLink: string;
}

const ProductNavigationInner: FC<IProps> = ({itemThickness, productTitle, productPageLink}) => {
  const navigate = useNavigate();
  return (
    <section className='productnavigation'>
      <div 
        className="productnavigation__item active"
        onClick={() => navigate(productPageLink)}>
        {productTitle}
      </div>
      <div className="productnavigation__item small">
        /
      </div>
      <div className="productnavigation__item">
        {itemThickness}
      </div>
    </section>
  )
};

export const ProductNavigation = React.memo(ProductNavigationInner);