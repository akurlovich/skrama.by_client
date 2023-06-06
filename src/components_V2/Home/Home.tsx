import React, { FC } from "react";
import './home.scss';
import { MainImage } from "./MainImage/MainImage";
import { MainAbout } from "./MainAbout/MainAbout";
import { MainFacts } from "./MainFacts/MainFacts";
import { MainServices } from "./MainServices/MainServices";
import { MainChooseUs } from "./MainChooseUs/MainChooseUs";
import { Loader_v2 } from "../UI/Loader_v2/Loader_v2";
import { TypeBlock } from "../TypeBlock/TypeBlock";
// @ts-ignore
import polik from '../../assets/img/main_img4.jpg';
// @ts-ignore
import shtak from '../../assets/img/main_img.jpg';


const Home: FC = () => {
  return (
    <main className="main__wrapper">
      {/* <ProductInfo/> */}
      {/* <ProductsBlock/> */}
      <TypeBlock title='Поликарбонат' linkTo="polikarbonat-main" imgSrc={polik}/>
      <TypeBlock title='Штакетник' linkTo="shtaketnik" imgSrc={shtak}/>
      {/* <MainImage/>
      <MainAbout/>
      <MainChooseUs/>
      <MainFacts/>
      <MainServices/> */}
    </main>
  );
};

export default Home;
