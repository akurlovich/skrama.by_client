import React, { FC, useEffect, useState } from 'react';
import { DEFAULT_POLIRBONAT_FILTER_TITLE, DEFAULT_TYPE_ID_POLIKARBONAT, DEFAULT_TYPE_ID_POLIK_KREPEZH, DEFAULT_TYPE_ID_POLIK_PLANKI, DEFAULT_TYPE_ID_SHTAKETNIK } from '../../constants/user';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getAllProductsInfo, getAllProductsInfoByTypeID, getProducts, getProductsByType } from '../../store/reducers/ProductReducer/ProductActionCreators';
import { IProductResponse } from '../../types/IProductResponse';
import { ProductItem } from '../ProductsBlock/ProductItem/ProductItem';
import { Loader_v2 } from '../UI/Loader_v2/Loader_v2';
import './picketfenceblock.scss';

const PicketFenceBlockInner: FC = () => {
  const dispatch = useAppDispatch();
  const { products, productsAllInfo, isLoading } = useAppSelector(state => state.productReducer);
  // const [sortData, setSortData] = useState('');
  // const [sortArrayValue, setSortArrayValue] = useState<string[]>([]);
  // const [readyProductsArray, setReadyProductsArray] = useState<IProductResponse[]>([]);

  // const readyFilterd = (sort: string) => {
  //   const productsFilter = productsAllInfo.filter(item => item.typeID === DEFAULT_TYPE_ID_POLIKARBONAT).filter(item => item.description === sort);
  //   const sortProduct: IProductResponse[] = [];
  //   for (const item of productsFilter) {
  //     const found = products.find(element => element._id === item.productID);
  //     if (found) {
  //       sortProduct.push(found);
  //     }
  //   }
  //   return sortProduct;
  // };

  // const changeSortData = (sort: string) => {
  //   setSortData(sort);
  //   const productsFilterKrepezh = products.filter(item => item.typeID === DEFAULT_TYPE_ID_POLIK_KREPEZH);
  //   const productsFilterPlanki = products.filter(item => item.typeID === DEFAULT_TYPE_ID_POLIK_PLANKI);
  //   if (sort === 'Крепеж') {
  //     setReadyProductsArray(productsFilterKrepezh);
  //     return;
  //   };
  //   if (sort === 'Планки') {
  //     setReadyProductsArray(productsFilterPlanki);
  //     return;
  //   };
  //   // setSortData(sort);
  //   const productsFilter = readyFilterd(sort);
  //   setReadyProductsArray([...productsFilter, ...productsFilterKrepezh, ...productsFilterPlanki]);
  // };

  useEffect(() => {
    (async () => {
      // await dispatch(getProducts());
      // await dispatch(getAllProductsInfo());
      await dispatch(getProductsByType(DEFAULT_TYPE_ID_SHTAKETNIK));
      await dispatch(getAllProductsInfoByTypeID(DEFAULT_TYPE_ID_SHTAKETNIK));
    })();
 
  }, []);

  // useEffect(() => {
  //   if (!sortData) {
  //     const productsFilterPolik = products.filter(item => item.typeID === DEFAULT_TYPE_ID_POLIKARBONAT);
  //     const productsFilterPolikepezh = products.filter(item => item.typeID === DEFAULT_TYPE_ID_POLIK_KREPEZH);
  //     const productsFilterPolikPlanki = products.filter(item => item.typeID === DEFAULT_TYPE_ID_POLIK_PLANKI);
  //     setReadyProductsArray([...productsFilterPolik, ...productsFilterPolikepezh, ...productsFilterPolikPlanki]);
  //   } else {
  //     const productsFilter = readyFilterd(sortData);
  //     setReadyProductsArray(productsFilter);
  //   }  
  //     const titleSortValue = productsAllInfo.filter(item => item.typeID === DEFAULT_TYPE_ID_POLIKARBONAT).filter(item => item.title === DEFAULT_POLIRBONAT_FILTER_TITLE);
  //     const filterData: string[] = [];
  //     for  (const item of titleSortValue) {
  //       const found = filterData.find(element => element === item.description);
  //       if (!found) {
  //         filterData.push(item.description);
  //       }
  //     };
     
  //     setSortArrayValue([...filterData, 'Крепеж', 'Планки']);

  // }, [products, productsAllInfo]);

  return (
    <section className='productsblock'>
      {isLoading && <Loader_v2/>}
      <h2 
        onClick={() => console.log(products)}
        className="productsblock__title">
        Штакетник
      </h2>
      <div className="productsblock__main">
        <div className="productsblock__sort">
          <div className="productsblock__sort__title">
            {DEFAULT_POLIRBONAT_FILTER_TITLE}
          </div>
          <ul>
            <li
              // key={item}
              className={`productsblock__sort__item`}
              // onClick={() => changeSortData(item)}
            >
              Толщина
            </li>
            {/* {sortArrayValue.map(item => (
              <li
                key={item}
                className={`productsblock__sort__item ${sortData === item ? 'active' : null}`}
                onClick={() => changeSortData(item)}
              >
                {item}
              </li>
            ))} */}
            
          </ul>
          {/* <div className="productsblock__sort__title dop-el">
            Доборные элементы
          </div>
          <div 
            className={`productsblock__sort__item ${sortData === item ? 'active' : null}`}
            onClick={() => changeSortData(DEFAULT_TYPE_ID_POLIK_KREPEZH)}>
            Крепеж
          </div>
          <div 
            className={`productsblock__sort__item ${sortData === item ? 'active' : null}`}
            onClick={() => changeSortData(DEFAULT_TYPE_ID_POLIK_PLANKI)}>
            Планки
          </div> */}
        </div>
        <div className="productsblock__container">
          {!products.length ? 
            <div className="productsblock__notfound">
              Товары не найдены!
            </div>
            : null
          }
          {products.map(item => 
            <ProductItem key={item._id} item={item} productsInfo={productsAllInfo}/>
          )}
        </div>
      </div>
    </section>
  )
}

export const PicketFenceBlock = React.memo(PicketFenceBlockInner);