import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import './productnavigation.scss';

interface IProps {
  itemThickness: string;
}

const ProductNavigationInner: FC<IProps> = ({itemThickness}) => {
  const navigate = useNavigate();
  return (
    <section className='productnavigation'>
      <div 
        className="productnavigation__item active"
        onClick={() => navigate('/polikarbonat')}>
        Поликарбонат
      </div>
      <div className="productnavigation__item small">
        /
      </div>
      <div className="productnavigation__item">
        {itemThickness}
      </div>
    </section>
  )
}

export const ProductNavigation = React.memo(ProductNavigationInner);