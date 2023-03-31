import React, { FC, useState } from 'react';
import './productdescription.scss';

const ProductDescriptionInner: FC = () => {
  const [sortData, setSortData] = useState('Описание');
  const ulData = ['Описание', 'Доставка', 'Применение', 'Оплата'];
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
      <div className="productinfo__description_main">
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
    </div>
  )
}

export const ProductDescription = React.memo(ProductDescriptionInner);