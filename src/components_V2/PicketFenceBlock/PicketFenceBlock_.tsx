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
            {/* {sortArrayValue && sortArrayValue.map(item => (
              <li
                key={item}
                className={`productsblock__sort__item ${sortData === item ? 'active' : null}`}
                onClick={() => changeSortData(item)}
              >
                {item}
              </li>
            ))} */}
            
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
          {/* <div 
            className="productsblock__pagination"
            // style={pagination.show ? {display: 'flex'} : {display: 'none'}}
            >
            <ul className="productsblock__pagination__block">
              {pagination.pageArray.map(item => 
                (<li 
                  // style={item === pagination.page ? {backgroundColor: 'gray'} : {}}
                  // onClick={() => paginationHandler(item)}
                  key={item}
                  className={item === pagination.currentPage ? "productsblock__pagination__item active" : "productsblock__pagination__item"}>{item} 
                </li>)
              )}
            </ul>
          </div> */}
        </div>
        
      </div>
      
    </section>
  )
}

export const PicketFenceBlock_ = React.memo(PicketFenceBlockInner);