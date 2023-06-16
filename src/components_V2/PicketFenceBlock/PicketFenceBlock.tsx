import React, { FC, useEffect, useState } from 'react';
import { DEFAULT_PAGINATION_ITEMS_LIMIT, DEFAULT_SHTAKETNIK_FILTER_TITLE, DEFAULT_TYPE_ID_SHTAKETNIK } from '../../constants/user';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { smoothScroll } from '../../services/ClientServices/SmothScroll';
import { getAllProductsInfoByTypeID, getProducts } from '../../store/reducers/ProductReducer/ProductActionCreators';
import { IProductResponse } from '../../types/IProductResponse';
import { ProductItem } from '../ProductsBlock/ProductItem/ProductItem';
import { Loader_v2 } from '../UI/Loader_v2/Loader_v2';
import './picketfenceblock.scss';

const PicketFenceBlockInner: FC = () => {
  const dispatch = useAppDispatch();
  const { products, productsAllInfo, isLoading, productsMaxRecords } = useAppSelector(state => state.productReducer);
  const [sortData, setSortData] = useState('');
  const [sortArrayValue, setSortArrayValue] = useState<string[]>([]);
  const [readyProductsArray, setReadyProductsArray] = useState<IProductResponse[]>([]);
  const [pagination, setPagination] = useState({show: true, page: 1, limit: DEFAULT_PAGINATION_ITEMS_LIMIT, pages: 1, pageArray: [] as number[]});

  let pArr: number[] = [];

  const readyFilterd = (sort: string) => {
    // console.log(products)
    const productsFilter = productsAllInfo.filter(item => item.typeID === DEFAULT_TYPE_ID_SHTAKETNIK).filter(item => item.description === sort);
    const sortProduct: IProductResponse[] = [];
    for (const item of productsFilter) {
      const found = products.find(element => element._id === item.productID);
      if (found) {
        sortProduct.push(found);
      }
    }
    return sortProduct;
  };

  const changeSortData = async (sort: string) => {
    // setSortData(sort);
    // dispatch(getProducts({typeID: DEFAULT_TYPE_ID_SHTAKETNIK, page: 1, limit: 1000})).then((res) => {
    //   const productsFilter = readyFilterd(sort);
    //   // console.log('first')
    //   setReadyProductsArray([...productsFilter]);
    //   setSortData(sort);

    // }
    // )
    setPagination(prev => ({...prev, page: 1, show: false}));

    setSortData(sort);
    // setSortData(sort);
    const productsFilter = readyFilterd(sort);
   
    setReadyProductsArray([...productsFilter]);
  };

  const paginationHandler = async (item: number) => {
    if (item === pagination.page) return;
    setPagination(prev => ({...prev, page: item}));
    // await dispatch(getProducts({typeID: DEFAULT_TYPE_ID_SHTAKETNIK, page: item, limit: pagination.limit}));
    smoothScroll();
  };

  useEffect(() => {
    (async () => {
      await dispatch(getProducts({typeID: DEFAULT_TYPE_ID_SHTAKETNIK, page: 1, limit: 1000}));
      await dispatch(getAllProductsInfoByTypeID(DEFAULT_TYPE_ID_SHTAKETNIK));
    })();
 
  }, []);

  useEffect(() => {
    // console.log('change products');
    if (!sortData) {
      const productsFilterPolik = products.filter(item => item.typeID === DEFAULT_TYPE_ID_SHTAKETNIK);
      setReadyProductsArray([...productsFilterPolik]);
    } else {
      const productsFilter = readyFilterd(sortData);
      setReadyProductsArray(productsFilter);
    }  
      const titleSortValue = productsAllInfo.filter(item => item.typeID === DEFAULT_TYPE_ID_SHTAKETNIK).filter(item => item.title === DEFAULT_SHTAKETNIK_FILTER_TITLE);
      const filterData: string[] = [];
      for  (const item of titleSortValue) {
        const found = filterData.find(element => element === item.description);
        if (!found) {
          filterData.push(item.description);
        }
      };
     
      const toNumberSort = filterData.map(item => Number(item.slice(0, -2))).sort((a, b,) => a - b);
      toNumberSort.shift();
      const toStringSort = toNumberSort.map(item => item.toString() + 'мм')
      setSortArrayValue([...toStringSort]);

      setPagination(prev => ({...prev, pages: Math.ceil(products.length / DEFAULT_PAGINATION_ITEMS_LIMIT)}));
      let pArr: number[] = [];
      for (let i = 1; i < pagination.pages + 1; i++) {
        pArr.push(i);
      };
      setPagination(prev => ({...prev, pageArray: [...pArr]}));

  }, [products, productsAllInfo]);

  return (
    <section className='productsblock'>
      {isLoading && <Loader_v2/>}
      <h2
        onClick={() => console.log(sortArrayValue)}
        className="productsblock__title">
        Штакетник
      </h2>
      <div className="productsblock__main">
        <div className="productsblock__sort">
          <div className="productsblock__sort__title">
            {DEFAULT_SHTAKETNIK_FILTER_TITLE}
          </div>
          <ul>
            {sortArrayValue && sortArrayValue.map(item => (
              <li
                key={item}
                className={`productsblock__sort__item ${sortData === item ? 'active' : null}`}
                onClick={() => changeSortData(item)}
              >
                {item}
              </li>
            ))}
            
          </ul>
        </div>
        <div className="productsblock__wrapper">
          <div className="productsblock__container">
            {!readyProductsArray.length ? 
              <div className="productsblock__notfound">
                Товары не найдены!
              </div>
              : null
            }
            {readyProductsArray.map(item => 
              <ProductItem key={item._id} item={item} productsInfo={productsAllInfo}/>
            )}
          </div>
          <div 
            className="productsblock__pagination"
            style={pagination.show ? {display: 'flex'} : {display: 'none'}}
            >
            <ul className="productsblock__pagination__block">
              {pagination.pageArray.map(item => 
                (<li 
                  // style={item === pagination.page ? {backgroundColor: 'gray'} : {}}
                  onClick={() => paginationHandler(item)}
                  key={item}
                  className={item === pagination.page ? "productsblock__pagination__item active" : "productsblock__pagination__item"}>{item} 
                </li>)
              )}
            </ul>
          </div>
        </div>
        
      </div>
      
    </section>
  )
}

export const PicketFenceBlock = React.memo(PicketFenceBlockInner);