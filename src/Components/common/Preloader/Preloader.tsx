import React from "react";
import preloader from "../../../assets/images/preloader.svg";

type PropsType = {};

let Preloader: React.FC = (props) => {
  return <img src={preloader} alt="preloader" />;
};

export default Preloader;
