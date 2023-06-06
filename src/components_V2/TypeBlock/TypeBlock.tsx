import React, { FC } from 'react';
import './typeblock.scss';
// @ts-ignore
import avatar from '../../assets/img/stroy.jpg';
import { useAppDispatch } from '../../hooks/redux';
import { useNavigate } from 'react-router-dom';

interface IProps {
  title: string;
  linkTo: string;
  imgSrc?: string;
};

const TypeBlockInner: FC<IProps> = ({title, linkTo, imgSrc}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handlerMore = () => {
    // dispatch(setCategoryId(typeID));
    navigate(`/${linkTo}`);
  };

  return (
    // <div className="typeblock">
      <div className="card">
        <div className="lines"></div>
        <div className="imgBx">
          <img src={imgSrc}/>
        </div>
        <div className="card__content">
          <div className="details">
            <h2>{title}<br></br><span></span></h2>
            {/* <div className="data">
              <h3>342<br></br><span>Posts</span></h3>
              <h3>120k<br></br><span>Folowers</span></h3>
              <h3>285<br></br><span>Folowing</span></h3>
            </div> */}
            <div className="actionBtn">
              <button
                onClick={handlerMore}
              >
                Перейти
              </button>
            </div>
          </div>
        </div>
      </div>
    // </div>
  )
}

export const TypeBlock = React.memo(TypeBlockInner)