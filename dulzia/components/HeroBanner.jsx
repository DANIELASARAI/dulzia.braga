import React from "react";
import LINK from "next/link";
import { urlFor } from "../lib/client";
const HeroBanner = ({ heroBanner }) => {
  return (
    <div className="hero-banner-container">
      <div>
        <p className="beats-solo">{heroBanner.smallText}</p>
      </div>
      <h3>{heroBanner.midText}</h3>
      <h1>{heroBanner.largeText1}</h1>
      <img
        src={urlFor(heroBanner.image)}
        alt="foto"
        className="hero-banner-image"
      />
      <div>
        <div className="desc">
          <h5>DESCRIÇÃO</h5>
          <p>{heroBanner.desc}</p>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
