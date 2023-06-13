import React, { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
//@ts-ignore
import mainAvatar from '../../../assets/img/main_avatar.png';
//@ts-ignore
import mainAvatarSmall from '../../../assets/img/main_avatar2.png';
import './mainimage.scss';
// import { LazyLoadImage } from "react-lazy-load-image-component";

const MainImageInner: FC = () => {
  // const [url, setUrl] = useState('');
  // useEffect(() => {
  //   fetch('../../../assets/img/main_avatar.png')
  //     .then(response => response.blob())
  //     .then((image) => {
  //       setUrl(URL.createObjectURL(image));
  //     });
  // }, []);
  

  return (
    <section className="main__title">
      <h1 className="main__title__text">
        Поликарбонат для Вашего дома: высокое качество и низкие цены!
      </h1>
      <div className="main__title__buttons">
        <Link to='/polikarbonat' className="btn btn-primary btn-lg">Купить</Link>
        <Link to='/about' className="btn btn-secondary btn-lg">Контакты</Link>
      </div>
      {/* <div className="main__title__image_small"> */}
        <img src={mainAvatar} className="main__title__image" alt="avatar" loading="lazy"/>
      {/* </div> */}
      {/* <img src={mainAvatar} className="main__title__image" alt="avatar" loading="lazy"/> */}
      {/* <iframe src="iframe" loading='lazy'></iframe> */}
      {/* <LazyLoadImage src={mainAvatar}
        // width={600} height={400}
        placeholderSrc={mainAvatarSmall}
        alt="Image Alt"
      /> */}
    </section>
  )
}

export const MainImage = React.memo(MainImageInner);