import React, { FC } from "react";
import './home.scss';
import { MainImage } from "./MainImage/MainImage";
import { MainAbout } from "./MainAbout/MainAbout";
import { MainFacts } from "./MainFacts/MainFacts";
import { MainServices } from "./MainServices/MainServices";
import { MainChooseUs } from "./MainChooseUs/MainChooseUs";
import { Loader_v2 } from "../UI/Loader_v2/Loader_v2";

const Home: FC = () => {
  return (
    <main className="main__wrapper">
      {/* <ProductInfo/> */}
      {/* <ProductsBlock/> */}
      <MainImage/>
      <MainAbout/>
      <MainChooseUs/>
      <MainFacts/>
      <MainServices/>
    </main>
  );
};

export default Home;
