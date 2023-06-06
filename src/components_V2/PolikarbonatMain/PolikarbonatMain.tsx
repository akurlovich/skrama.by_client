import React, { FC } from "react";
import './polikarbonatmain.scss';
import { MainImage } from "../Home/MainImage/MainImage";
import { MainAbout } from "../Home/MainAbout/MainAbout";
import { MainChooseUs } from "../Home/MainChooseUs/MainChooseUs";
import { MainFacts } from "../Home/MainFacts/MainFacts";
import { MainServices } from "../Home/MainServices/MainServices";


const PolikarbonatMain: FC = () => {
  return (
    <main className="polikarbonatmain__wrapper">
      <MainImage/>
      <MainAbout/>
      <MainChooseUs/>
      <MainFacts/>
      <MainServices/>
    </main>
  );
};

export default PolikarbonatMain;