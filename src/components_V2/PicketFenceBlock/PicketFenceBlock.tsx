import React, { FC, useEffect, useState } from 'react';
import { DEFAULT_PAGINATION_ITEMS_LIMIT, DEFAULT_SHTAKETNIK_FILTER_TITLE, DEFAULT_TYPE_ID_SHTAKETNIK } from '../../constants/user';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { smoothScroll } from '../../services/ClientServices/SmothScroll';
import { getAllProductsInfoByTypeID, getProducts } from '../../store/reducers/ProductReducer/ProductActionCreators';
import { IProductResponse } from '../../types/IProductResponse';
import { ProductItem } from '../ProductsBlock/ProductItem/ProductItem';
import { Loader_v2 } from '../UI/Loader_v2/Loader_v2';
import { Pagination } from '../UI/Pagination/Pagination';
import './picketfenceblock.scss';

const PicketFenceBlockInner: FC = () => {
  const dispatch = useAppDispatch();
  const { products, productsAllInfo, isLoading } = useAppSelector(state => state.productReducer);
  const [pagination, setPagination] = useState({show: true, currentPage: 1});

  const indexOfLastPost = pagination.currentPage * DEFAULT_PAGINATION_ITEMS_LIMIT;
  const indexOfFirstPost = indexOfLastPost - DEFAULT_PAGINATION_ITEMS_LIMIT;
  const [currentProducts, setCurrentProducts] = useState([] as IProductResponse[]);
  const [sortData, setSortData] = useState({sortArrayValue: [] as string[], sortValue: ''});

  const readyFiltered = (sort: string) => {
    const productsFilter = productsAllInfo.filter(item => item.description === sort);
    const sortProduct: IProductResponse[] = [];
    for (const item of productsFilter) {
      const found = products.find(element => element._id === item.productID);
      if (found) {
        sortProduct.push(found);
      }
    }
    return sortProduct;
  };

  const pageHandler = (page: number) => {
    setPagination(prev => ({...prev, currentPage: page}));
    const indexOfLastPost = page * DEFAULT_PAGINATION_ITEMS_LIMIT;
    const indexOfFirstPost = indexOfLastPost - DEFAULT_PAGINATION_ITEMS_LIMIT;
    setCurrentProducts(products.slice(indexOfFirstPost, indexOfLastPost));
    smoothScroll();
 };

  useEffect(() => {
    (async () => {
      await dispatch(getProducts({typeID: DEFAULT_TYPE_ID_SHTAKETNIK, page: 1, limit: 1000}));
      await dispatch(getAllProductsInfoByTypeID(DEFAULT_TYPE_ID_SHTAKETNIK));
    })();

  }, []);

  useEffect(() => {
    setCurrentProducts(products.slice(indexOfFirstPost, indexOfLastPost));

  }, [products]);

  useEffect(() => {
   const titleSortValue = productsAllInfo.filter(item => item.title === DEFAULT_SHTAKETNIK_FILTER_TITLE);
    const filterData: string[] = [];
    for  (const item of titleSortValue) {
      const found = filterData.find(element => element === item.description);
      if (!found) {
        filterData.push(item.description);
      }
    };
   
    const toNumberSort = filterData.map(item => Number(item.slice(0, -2))).sort((a, b,) => a - b);
    toNumberSort.shift();
    const toStringSort = toNumberSort.map(item => item.toString() + 'мм');
    setSortData(prev => ({...prev, sortArrayValue: [...toStringSort]}));
  }, [productsAllInfo]);
  
  useEffect(() => {
    const filter = readyFiltered(sortData.sortValue);
    setCurrentProducts(filter);
    if (sortData.sortValue) {
      setPagination(prev => ({...prev, show: false}));
    }
  }, [sortData.sortValue]);
  
  return (
    <section className='productsblock'>
      {isLoading && <Loader_v2/>}
      <h2
        className="productsblock__title">
        Штакетник
      </h2>
      <div className="productsblock__main">
        <div className="productsblock__sort">
          <div className="productsblock__sort__title">
            {DEFAULT_SHTAKETNIK_FILTER_TITLE}
          </div>
          <ul>
            {sortData.sortArrayValue && sortData.sortArrayValue.map(item => (
              <li
                key={item}
                className={`productsblock__sort__item ${sortData.sortValue === item ? 'active' : null}`}
                onClick={() => setSortData(prev => ({...prev, sortValue: item}))}
              >
                {item}
              </li>
            ))}
            
          </ul>
        </div>
        <div className="productsblock__wrapper">
          <div className="productsblock__container">
            {!currentProducts.length ? 
              <div className="productsblock__notfound">
                Товары не найдены!
              </div>
              : null
            }
            {currentProducts.map(item => 
              <ProductItem key={item._id} item={item} productsInfo={productsAllInfo}/>
            )}
          </div>
          {pagination.show && 
            <Pagination
              totalItems={products.length}
              limit={DEFAULT_PAGINATION_ITEMS_LIMIT}
              currentPage={pagination.currentPage}
              setPage={pageHandler}
            />
          }
        </div>
        
      </div>
      
    </section>
  )
}

export const PicketFenceBlock = React.memo(PicketFenceBlockInner);