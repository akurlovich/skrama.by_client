import React, { FC } from 'react';
import './pagination.scss';

interface IProps {
  totalItems: number,
  limit: number,
  currentPage: number,
  setPage: (page: number) => void,
  
}

const PaginationInner: FC<IProps> = ({totalItems, limit, currentPage, setPage}) => {
  const pageNumbers : number[] = [];
    for (let i = 1; i <= Math.ceil(totalItems / limit); i++) {
      pageNumbers.push(i);
    };

  return (
    <div className="pagination">
      <ul className="pagination__block">
        {pageNumbers.map(item => 
          (<li 
            onClick={() => setPage(item)}
            key={item}
            className={item === currentPage ? "pagination__item active" : "pagination__item"}
            >
              {item} 
          </li>)
        )}
      </ul>
    </div>
    
  )
}

export const Pagination = React.memo(PaginationInner);