import React, { FC, useState } from 'react';
import './productdescription.scss';

const ProductDescriptionInner: FC = () => {
  const [sortData, setSortData] = useState('Описание');
  // const ulData = ['Описание', 'Доставка', 'Применение', 'Оплата'];
  const ulData = ['Описание', 'Доставка'];
  return (
    <div className="productinfo__description">
      <ul className="productinfo__description_nav">
        {ulData.map(item => (
          <li 
            key={item}
            className={`productinfo__description__navitem ${sortData === item ? 'active' : null}`}
            onClick={() => setSortData(item)}
            >
            {item}
          </li>
        ))}
      </ul>
      <div className="productinfo__description_line"></div>
      {sortData === ulData[0] &&
        <div className="productinfo__description_description">
          <p>
          Сотовый поликарбонат – самый оптимальный вариант для теплицы или парника с отличной светопропускной способностью.
          </p>
          <p>
          Лист сотового поликарбоната имеет низкий вес, что в 19 раз легче стекла аналогичной толщины, сохраняет упругость и эластичность при больших изгибах. 
          </p>
          <p>
          UV-слой покрывает лицевую сторону листа сотового поликарбоната и препятствует разрушению под воздействием ультрафиолета.
          </p>
          <p>
          Также поликарбонат считается экологически чистым материалом. Не содержит вредных веществ, не имеет запаха. Не подвержен грибкам и плесени, хорошо моется. Антибактериальный.
          </p>
          <p>
          С обеих сторон лист сотового поликарбоната покрыт защитной пленкой. С лицевой стороны, которая при монтаже должна быть ориентирована к солнцу, расположен логотип. После монтажа листов поликарбоната защитная пленка должна быть удалена.
          </p>
        </div>
      }
      {sortData === ulData[1] &&
        <div className="productinfo__description_description">
          <h3>
            Доставка по Минску и Минскому району
          </h3>
          <p>
          Вы можете заказать доставку товара с помощью курьера в будние дни, а также в выходные дни по предварительной договорённости. После оформления заказа мы свяжемся с вами и согласуем время и место доставки.
          </p>
          <h3>
            Самовывоз
          </h3>
          <p>
            По предварительной договорённости, забрать товар можно по адресу: г.Минск, ул.П.Глебки, д.11
          </p>
        </div>
      }
      {sortData === ulData[2] && 
        <div className="productinfo__description_description">
        Условия оплаты
        </div>
      
      } 
    </div>
  )
}

export const ProductDescription = React.memo(ProductDescriptionInner);