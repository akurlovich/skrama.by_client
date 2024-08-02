import React, { FC } from "react";
import './home.scss';
import { MainImage } from "./MainImage/MainImage";
import { MainAbout } from "./MainAbout/MainAbout";
import { MainFacts } from "./MainFacts/MainFacts";
import { MainServices } from "./MainServices/MainServices";
import { MainChooseUs } from "./MainChooseUs/MainChooseUs";
import { Loader_v2 } from "../UI/Loader_v2/Loader_v2";
import { TypeBlock } from "../TypeBlock/TypeBlock";
// // @ts-ignore
// import polik from '../../assets/img/main_img4.jpg';
// // @ts-ignore
// import shtak from '../../assets/img/main_img.jpg';
// // @ts-ignore
// import shifer from '../../assets/img/main_img5.jpg';
import { TypeCard } from "../TypeCard/TypeCard";


const Home: FC = () => {
  return (
    <main className="main__wrapper">
      {/* <ProductInfo/> */}
      {/* <ProductsBlock/> */}
      <div className="main__wrapper__title">
        <div className="main__wrapper__title_primary">
          Выберите
        </div>
        <div className="main__wrapper__title_secondary">
          продукцию:
        </div>
      </div>
      <div className="main__wrapper__main">
        {/* <TypeBlock title='Поликарбонат' linkTo="polikarbonat-main" imgSrc={polik}/> */}
        {/* <TypeBlock title='Поликарбонат' linkTo="polikarbonat" imgSrc={polik}/> */}
        {/* <TypeBlock title='Штакетник' linkTo="shtaketnik" imgSrc={shtak}/> */}
        <TypeCard title="Поликарбонат" text="сотовый" linkTo="polikarbonat" imgSrc='images/main_img4.jpg'/>
        <TypeCard title="Штакетник" linkTo="shtaketnik" imgSrc='images/main_img.jpg'/>
        <TypeCard title="Шифер" linkTo="shifer" imgSrc='images/main_img5.jpg'/>
      </div>
      {/* <MainImage/>
      <MainAbout/>
      <MainChooseUs/>
      <MainFacts/>
      <MainServices/> */}
    </main>
  );
};

export default Home;
